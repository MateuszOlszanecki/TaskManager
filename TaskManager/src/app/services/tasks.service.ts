import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { GlobalVariables } from '../shared/global-variables';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks_changed$ = new Subject<Task[]>();

  constructor(private dataStorageService: DataStorageService,
              private router: Router) {}

  private tasks: Task[] = [];

  handleError() {
    this.router.navigate(['error']);
  }

  getTasksFromDatabase() {
    this.dataStorageService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.nextTasksChanged();
      },
      error: () => this.handleError()
    });
  }

  postTaskToDatabase(task: Task) {
    this.dataStorageService.postTask(task).subscribe({
      next: () => this.getTasksFromDatabase(),
      error: () => this.handleError()
    })
  }

  putTaskToDatabase(task: Task) {
    this.dataStorageService.putTask(task).subscribe({
      next: () => this.getTasksFromDatabase(),
      error: () => this.handleError()
    })
  }

  deleteTaskFromDatabase(id: number) {
    this.dataStorageService.deleteTask(id).subscribe({
      next: () => this.getTasksFromDatabase(),
      error: () => this.handleError()
    })
  }

  nextTasksChanged() {
    this.tasks_changed$.next(this.getTasks());
  }

  getTasks() {
    let tasks: Task[] = [];
    this.tasks.forEach(task => {
      tasks.push(task.deepCopy())
    });
    return tasks;
  }

  getTask(id: number) {
    return this.getTasks().find(task => {return task.id === id});
  }
  
  getTasksIndex(id: number) {
    return this.getTasks().findIndex(task => {return task.id === id});
  }

  getStaffMemberTasks(staff_member_id: number) {
    return this.getTasks().filter(task => {
      return task.staff_member_id === staff_member_id;
    })
  }

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.getStaffMemberTasks(staff_member_id);
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
