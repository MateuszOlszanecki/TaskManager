import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { GlobalVariables } from '../global-variables';
import { Subject } from 'rxjs';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks_changed$ = new Subject<Task[]>();

  private tasks: Task[] = [
    new Task("Jan Task1", 0, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Jan Task2", 0, GlobalVariables.TASK_STARTED_STATUS, 50),
    new Task("Tomasz Task1", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Tomasz Task2", 1, GlobalVariables.TASK_NOT_STARTED_STATUS, 0),
    new Task("Tomasz Task3", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Jacek Task1", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Jacek Task2", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Jacek Task3", 2, GlobalVariables.TASK_FINISHED_STATUS, 100)
  ];

  nextTasksChanged() {
    this.tasks_changed$.next(this.getAllTasks());
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.nextTasksChanged();
  }
  getTaskIndex(task: Task) {
    return this.tasks.indexOf(task);
  }

  getAllTasks() {
    //deepcopy array
    return deepCopy(this.tasks);
  }

  getTask(task_index: number) {
    return this.getAllTasks()[task_index];
  }

  getStaffMemberTasks(staff_member_id: number) {
    return this.tasks.filter(task => {
      return task.staff_member_id === staff_member_id;
    })
  }

  removeTask(task_index: number) {
    this.tasks.splice(task_index, 1);
    this.nextTasksChanged();
  }

  removeStaffMemberTasks(staff_member_id: number) {
    for(let i = this.tasks.length - 1; i >= 0; i--){
      if(this.tasks[i].staff_member_id === staff_member_id){
        this.removeTask(i);
      }
    }
    this.nextTasksChanged();
  }

  updateTask(task_index: number, task: Task) {
    this.tasks[task_index] = task;
    this.nextTasksChanged();
  }

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.getStaffMemberTasks(staff_member_id);
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
