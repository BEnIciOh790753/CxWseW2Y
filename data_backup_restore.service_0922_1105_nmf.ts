// 代码生成时间: 2025-09-22 11:05:46
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataBackupRestoreService {

  private backupUrl = '/api/backup';
  private restoreUrl = '/api/restore';

  constructor(private http: HttpClient) {}

  /**
   * Perform a backup of the data.
   * @param data The data to backup.
   * @returns An Observable of the backup response.
   */
  public backupData(data: any): Observable<any> {
    return this.http.post(this.backupUrl, data)
      .pipe(
        retry(3), // Retry the request up to 3 times in case of failure.
        catchError(this.handleError) // Handle any errors that occur.
      );
  }

  /**
   * Restore data from a backup.
   * @param backupId The ID of the backup to restore from.
   * @returns An Observable of the restore response.
   */
  public restoreData(backupId: string): Observable<any> {
    return this.http.get(`${this.restoreUrl}/${backupId}`)
      .pipe(
        retry(3), // Retry the request up to 3 times in case of failure.
        catchError(this.handleError) // Handle any errors that occur.
      );
  }

  /**
   * Handle HTTP error.
   * @param error The error caught during the HTTP operation.
   * @returns An Observable that throws the error.
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      errorMessage = `Backend returned code ${error.status}, body was: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
