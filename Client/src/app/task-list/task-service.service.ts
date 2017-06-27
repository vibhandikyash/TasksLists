import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

  constructor(public task: Task) { }

  getTasks(): Promise<Task[]> {
    return Promise.resolve(JSON.parse(localStorage.getItem("Tasks")));
  }

  setTasks(Task: Task): Promise<any> {
    var tasks: Task[];
    tasks = localStorage.getItem("Tasks") != null ? JSON.parse(localStorage.getItem("Tasks")) : new Array<Task>();
    tasks.push(Task);
    return Promise.resolve(localStorage.setItem("Tasks", JSON.stringify(tasks)));
  }

  getSingleTask(id: string): Promise<any> {
    var task = this.getTasks()
      .then(alltask => { if (alltask) { return alltask.find(task => task.id == id) } })
      .catch((e) => { return Promise.reject('Some Error Occured ' + e) });
    if (task) {
      return Promise.resolve(task);
    } else {
      return Promise.reject('Opps! No such Task Found');
    }
  }

  updateTask(task: Task): Promise<any> {
    var tasks: Task[];
    tasks = JSON.parse(localStorage.getItem("Tasks"));
    let index = tasks.indexOf(tasks.find(all => all.id == task.id));
    if (index == -1) {
      return Promise.reject('Opps! No such Task Found');
    }
    // tasks = tasks.filter(tasks => tasks != task);
    tasks.splice(index, 1);
    tasks.push(task);
    return Promise.resolve(localStorage.setItem("Tasks", JSON.stringify(tasks)));
  }
  // return Promise.resolve(this.getTasks().then((tasks) => {
  //   let index = tasks.indexOf(tasks.find(all => all.id == task.id));
  //   // tasks = tasks.filter(tasks => tasks != task);
  //   tasks.splice(index, 1);
  //   tasks.push(task);
  //   localStorage.setItem("Tasks", JSON.stringify(tasks));
  // }));
  // return Promise.reject('Something went Wrong....!');

}
