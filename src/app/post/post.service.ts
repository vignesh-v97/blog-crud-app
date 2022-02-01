import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError }from 'rxjs/operators'
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = "https://jsonplaceholder.typicode.com";

  constructor(private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/posts`)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  create(post: Post) : Observable<any> {
    return this.http.post(this.apiUrl + '/posts', post)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: number) : Observable<any> {
    return this.http.get(`${this.apiUrl}/posts/${id}`)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: number, post: Post) : Observable<any> {
    return this.http.put(`${this.apiUrl}/posts/${id}`, post)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: number) : Observable<any> {
    return this.http.delete(`${this.apiUrl}/posts/${id}`)
      .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(err: any) {
    let errorMessage:string = '';
    if(err.error instanceof ErrorEvent) {
      errorMessage = err.error.message;
    } else {
      errorMessage = `Error Code : ${err.status}\nMessage: ${err.message}`;
    }
    return throwError(errorMessage)
  }
}
