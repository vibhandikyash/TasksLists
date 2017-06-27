import { Component, OnInit, Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPhases } from './task-phases.enum';
import { TaskService } from './task-service.service';
import { TaskMongoService } from './task-mongo.service';
import { Task } from './task';
import { TaskPhaseFilterPipe } from './task-phase-filter.pipe';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

// import { NotificationsService } from 'angular2-notifications'; 

@Component({
  selector: 'tasks',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService, Task, NotificationsService, TaskMongoService],
})

export class TaskListComponent implements OnInit {

  public _taskphases = TaskPhases;
  allTask: Task[];
  currentTask: Task;
  form: NgForm;

  public options = {
    position: ["bottom", "right"],
    timeOut: 5000,
    lastOnBottom: true,
    pauseOnHover: false,
    clickToClose: true,
    showProgressBar: true,
    maxLength: 10
  }

  constructor(private _taskservice: TaskService, public _service: NotificationsService,
    private _mongoservice: TaskMongoService, private _DragulaService: DragulaService, private _cdref: ChangeDetectorRef) {
    this._DragulaService.drop.subscribe(value => console.log(value[1].getAttribute('id')));
    // this._DragulaService.drop.subscribe(value => this.allTask.find(task => task.id == value[1].getAttribute('id')).title);
    // this._DragulaService.drop.subscribe(value => console.log(value[2].getAttribute('id')));
    // this._DragulaService.drop.subscribe(value => console.log(value[3].getAttribute('id')));
    // console.log(this.allTask.find(task => task._id == value[1].getAttribute('id')).title)
    // this._DragulaService.drop.subscribe(value => this._service.success(this.allTask.find(task => task._id == value[1].getAttribute('id')).title + ' was moved from ' + value[3].getAttribute('id') + ' to ' + value[2].getAttribute('id')));

    this._DragulaService.drop.subscribe(value => this.updateOnDrop(value));
    // .subscribe(() => this.GetAllTasks());

    this._DragulaService.setOptions('columnbag', {
      moves: function (el, container, handle) {
        return handle.className === 'handle';
      }
    });
    // this._taskphases = TaskPhases;
  }

  ngOnInit() {
    console.log('init');
    this.currentTask = new Task();
    this.allTask = new Array<Task>();
    this.GetAllTasks();
  }

  updateOnDrop(value: any) {
    var phaseChange = {
      _id: value[1].getAttribute('id'),
      phase: TaskPhases[value[2].getAttribute('id')]
    }
    this._mongoservice.updateTask(phaseChange)
      .map(tasks => this.allTask = tasks)
      .subscribe(() => this.successnotify('Task Updated!'));
    // .subscribe(() => { this.GetAllTasks() });
  }

  successnotify(msg: string) {
    this._service.success(msg);
  }
  errornotify(msg: string) {
    this._service.error(msg);
  }

  SaveTask = function () {
    if (this.currentTask._id == undefined) {
      this._mongoservice.saveTask(this.currentTask)
        .subscribe(() => { this.GetAllTasks(); this.successnotify(this.currentTask.title + ' : Task Saved Successfully!'); this.resetCurrentTask(); })
    } else {
      // console.log(JSON.stringify(this.currentTask));
      this._mongoservice.updateTask(this.currentTask)
        .subscribe(() => { this.GetAllTasks(); this.successnotify(this.currentTask.title + ' : Task updated successfully!'); this.resetCurrentTask(); })
    }
  }

  GetAllTasks = function () {
    this._mongoservice.getTasks().subscribe(tasks => this.allTask = tasks);
  }

  resetCurrentTask = function () {
    this.currentTask = new Task();
    // this.form.reset();
  }

  getSingleTask = function (id) {
    this.currentTask = this.allTask.find(tasks => tasks._id == id);
  }
}

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (var enumMember in value) {
      if (!isNaN(parseInt(enumMember, 10))) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }
}
