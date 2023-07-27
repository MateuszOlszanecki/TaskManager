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
    new Task(0, "Jan Task1", 0, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task(1, "Jan Task2", 0, GlobalVariables.TASK_STARTED_STATUS, 50),
    new Task(2, "Tomasz Task1", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task(3, "Tomasz Task2", 1, GlobalVariables.TASK_NOT_STARTED_STATUS, 0),
    new Task(4, "Tomasz Task3", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task(5, "Jacek Task1", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task(6, "Jacek Task2", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task(7, "Jacek Task3", 2, GlobalVariables.TASK_FINISHED_STATUS, 100)
  ];

  first_free_id = 8;

  nextTasksChanged() {
    this.tasks_changed$.next(this.getAllTasks());
  }

  getNextId() {
    return this.first_free_id++;
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.nextTasksChanged();
  }

  getAllTasks() {
    //deepcopy array
    return deepCopy(this.tasks);
  }

  getTask(id: number) {
    return this.tasks.find(task => {return task.id === id});
  }

  getStaffMemberTasks(staff_member_id: number) {
    return this.tasks.filter(task => {
      return task.staff_member_id === staff_member_id;
    })
  }
  
  getTasksIndex(id: number) {
    return this.tasks.findIndex(task => {return task.id === id});
  }

  updateTask(id: number, task: Task) {
    let index = this.getTasksIndex(id);
    this.tasks[index] = task;
    this.nextTasksChanged();
  }

  removeTask(id: number) {
    let index = this.getTasksIndex(id);
    this.tasks.splice(index, 1);
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

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.getStaffMemberTasks(staff_member_id);
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
