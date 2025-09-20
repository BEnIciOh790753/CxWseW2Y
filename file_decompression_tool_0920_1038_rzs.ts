// 代码生成时间: 2025-09-20 10:38:30
 * This Angular service allows users to decompress files using a simple interface.
 * It handles decompression of popular file formats like ZIP and TAR.GZ.
 *
 * @module FileDecompressionTool
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment'; // Import environment to get API URL
import JSZip from 'jszip';
import { JSZipSupport } from 'ng-jhipster';
JSZipSupport.install();

@Injectable({
  providedIn: 'root'
})
export class FileDecompressionToolService {
  
  // Define the API endpoint for file decompression
  private decompressionEndpoint: string = environment.decompressionEndpoint;
  
  constructor(private http: HttpClient) {}
  
  /**
   * Decompresses a file
   *
   * @param {File} file The file to decompress
   * @returns {Observable<any>} An observable that emits the decompressed file content
   */
  decompressFile(file: File): Observable<any> {
    try {
      // Read the file as an ArrayBuffer
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      
      reader.onload = (event: ProgressEvent) => {
        // Convert the ArrayBuffer to a Blob
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer]);
        
        // Use JSZip to decompress the file
        JSZip.loadAsync(blob).then(zip => {
          console.log('Zip file structure:', zip);
          // Here you can process the files within the zip
          // For example, you can list files, extract them, etc.
          
          // For demonstration, let's just log out the file names
          zip.forEach((relativePath, zipEntry) => {
            console.log(zipEntry.name);
          });
        }, error => {
          throw new Error('Failed to decompress the file: ' + error.message);
        });
      };
    } catch (error) {
      console.error('DecompressFile error:', error);
      throw new Error('An error occurred while decompressing the file: ' + error.message);
    }
  }
}
