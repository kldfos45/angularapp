import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TASKS } from "../classes/tasks";
import { Task } from "../classes/task";
import { TaskService } from '../services/task.service';
import { HttpClient } from '@angular/common/http';
import { dirname } from 'path';
import { Router } from '@angular/router';
import { Route } from '@angular/router/src/config';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {

  tasks: Task[] = TASKS;

  constructor(
    private taskService: TaskService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  deleteTask(task: Task) {
    console.log('delete');
    this.taskService.deleteTask(task);
  }

  json(): void {
    this.http.get('../assets/test.json').subscribe(res => console.log(res));
  }

  update(task: Task): void {
    console.log(task.id);
    this.router.navigateByUrl('/detail/' + task.id);
  }

}
