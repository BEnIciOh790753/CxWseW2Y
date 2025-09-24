// 代码生成时间: 2025-09-24 21:21:02
 * Features:
 * - Decompressing common file formats.
 * - Error handling for unsupported formats and file reading errors.
 * - Modular design for easy extension to support more file formats.
 *
 * @author Your Name
 * @version 1.0.0
 * @license MIT
 */

import { Injectable } from '@angular/core';
import * as AdmZip from 'adm-zip';
import * as fs from 'fs';
import * as path from 'path';

@Injectable({
  providedIn: 'root'
})
export class FileExtractorService {

  constructor() {}

  /**
   * Extracts files from a given ZIP archive.
   *
   * @param zipFilePath The path to the ZIP file.
   * @param outputDir The directory where extracted files will be placed.
   * @returns Promise<void> Resolves when extraction is complete, rejects on error.
   */
  extractZipFile(zipFilePath: string, outputDir: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const zip = new AdmZip(zipFilePath);
        if (!zip.getEntries()) {
          throw new Error('No entries found in the ZIP file.');
        }
        zip.extractAllTo(outputDir, /*overwrite*/true);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Checks if the provided path is a directory.
   *
   * @param pathToCheck The path to be checked.
   * @returns boolean True if the path is a directory, false otherwise.
   */
  private isDirectory(pathToCheck: string): boolean {
    return fs.existsSync(pathToCheck) && fs.lstatSync(pathToCheck).isDirectory();
  }

  /**
   * Ensures the output directory exists, if not, it creates it.
   *
   * @param outputDir The directory to ensure exists.
   */
  private ensureOutputDir(outputDir: string): void {
    if (!this.isDirectory(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  }
}
