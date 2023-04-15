import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
 BASE_URL: string = 'http://localhost:8080/api/todo';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(`${this.BASE_URL}`);
  }

  addTask(content: String, deadline?: Date) {
    if(deadline !== undefined) {
      return this.http.post(this.BASE_URL, {content: content, deadline: deadline});
    }
    return this.http.post(this.BASE_URL, {content: content});
  }

  deleteTask(id: any) {
    return this.http.delete(`${this.BASE_URL}/${id}`);
  }

  updateTask(id: any, content: String, deadline: Date, completed: boolean) {
    return this.http.put(`${this.BASE_URL}/${id}`, {content: content, deadline: deadline, completed: completed}, {responseType: 'text'});
  }
}

