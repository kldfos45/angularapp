import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from "../classes/task";
import { TaskService } from "../services/task.service";
import * as uuid from 'uuid/v1';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  encapsulation: ViewEncapsulation.Native

})
export class DetailComponent implements OnInit {

  id: string;
  content: string;
  done: boolean = false;
  type: string;
  task: Task;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
    console.log('ini');
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.type = id === null ? 'ajout' : 'update';
    this.task = this.taskService.getTask(id);
    if (this.type === 'update') {
      this.content = this.task.content;
      this.done = this.task.done;
    }

  }

  clear(): void {
    this.id = null;
    this.content = null;
    this.done = null;
  }

  toto() {
    console.log('toto');
    console.log(this.done);
  }

  addTask(): void {

    if (this.type === 'ajout') {
      if (this.content != null) {

        let task = new Task(
          uuid(),
          this.content,
          this.done
        )

        this.taskService.addTask(task);
        this.clear();
        // this.router.navigateByUrl('/list');
        this.location.back();
      } else {
        console.log('création impossible');
        return;
      }
    }

    if (this.type === 'update') {
      this.update();
    }
  }

  press(e): void {
    if (e.keyCode === 13) this.addTask();
  }

  update(): void {
    console.log('update');
    this.task.content = this.content;
    console.log(this.done);
    this.task.done = this.done;
    this.taskService.updateTask(this.task);
    this.task = null;
    this.clear();
    this.router.navigateByUrl('/list');
  }

}
