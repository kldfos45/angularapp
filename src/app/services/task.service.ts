import { Injectable } from '@angular/core';
import { TASKS } from '../classes/tasks';
import { Task } from "../classes/task";
import * as _ from 'lodash';
import { MemoVoidIterator } from 'lodash';

@Injectable()
export class TaskService {

  tasks: Task[] = TASKS;

  constructor() { }

  getTask(id: string): Task {
    return _.find(this.tasks, (o) => { return o.id == id });
  }

  getTasks(): Task[] {
    return TASKS;
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  deleteTask(task: Task): void {
    let index = _.findIndex(this.tasks, (o) => { return o.id === task.id });
    this.tasks.splice(index, 1);
  }

  updateTask(task: Task): void {
    console.log('update task');
    let index = _.findIndex(this.tasks, (o) => { return o.id == task.id });
    console.log(index);
    console.log(this.tasks[index]);
    this.tasks[index].content = task.content;
    this.tasks[index].done = task.done;
  }


}
