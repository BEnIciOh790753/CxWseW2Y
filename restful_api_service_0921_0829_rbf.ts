// 代码生成时间: 2025-09-21 08:29:32
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 定义一个接口来描述API响应的数据结构
export interface ApiResponse {
  data: any;
  message: string;
  status: number;
}

@Injectable({
  providedIn: 'root'
})
export class RestfulApiService {
  private baseUrl = 'https://api.example.com'; // 替换为实际的API URL

  constructor(private http: HttpClient) {}

  // 获取数据
  public getData<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 创建数据
  public postData<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 更新数据
  public putData<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, body)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 删除数据
  public deleteData(endpoint: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${endpoint}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // 错误处理
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // 客户端或网络错误处理
      console.error('An error occurred:', error.error.message);
    } else {
      // API返回的错误处理
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // 返回一个用户友好的错误响应用于Observable的订阅者
    return throwError('Something bad happened; please try again later.');
  }
}
