// 代码生成时间: 2025-09-20 03:44:01
// error_logger_service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 错误日志接口
export interface ErrorLog {
  timestamp: Date;
  message: string;
  stackTrace: string;
  user: string;
  additionalInfo?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorLoggerService {
  
  // API endpoint for error log
  private errorLogEndpoint = '/api/error-logs';
  
  constructor(private http: HttpClient) {}
  
  /**
   * Logs an error to the server.
   * @param error The error to log. 
   */
  logError(error: Error, user: string, additionalInfo?: any): Observable<any> {
    const errorLog: ErrorLog = {
      timestamp: new Date(),
      message: error.message,
      stackTrace: error.stack,
      user,
      additionalInfo
    };
    
    return this.http.post(this.errorLogEndpoint, errorLog).pipe(
      catchError(this.handleError)
    );
  }
  
  // Handle Http operation that failed.
  // Let the app continue.
  private handleError(error: any): Observable<never> {
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    
    // Log error to console
    console.error(errorMessage);
    
    // Return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}
