import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './Task';
import { Http, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskMongoService {

  constructor(private http: Http) { }

  getTasks(): Observable<Task[]> {
    return this.http.get('http://localhost:3000/api/getalltasks').map(tasks => tasks.json());
  }

  saveTask(task: Task): Observable<any> {
    // let myheaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: myheaders });
    return this.http.post('http://localhost:3000/api/createtask', task);
  }

  updateTask(task: any): Observable<any> {
    // let myheaders = new Headers({ 'Content-Type': 'application/json' });
    // let options = new RequestOptions({ headers: myheaders });
    return this.http.post('http://localhost:3000/api/updateTask', task).map(tasks => tasks.json());
  }

} 
