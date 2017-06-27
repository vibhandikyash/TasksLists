import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { LoginComponent } from './login/login.component';
import { TaskListComponent, KeysPipe } from './task-list/task-list.component';
import { TaskService } from './task-list/task-service.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TaskPhaseFilterPipe } from './task-list/task-phase-filter.pipe';
import { DragulaModule } from 'ng2-dragula';
import { MaterialTaskComponent } from './material-task/material-task.component';
import { Router, RouterModule, Routes } from '@angular/router';
import {MaterialModule, MdNativeDateModule} from '@angular/material';
// import { CustomValidators } from 'ng2-validation';


const routes: Routes = [
  { path: 'materialTask', component: MaterialTaskComponent },
  { path: 'Tasks', component: TaskListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TaskListComponent,
    TaskPhaseFilterPipe,
    KeysPipe,
    MaterialTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    DragulaModule,
    MaterialModule,
    HttpModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
