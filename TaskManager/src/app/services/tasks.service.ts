import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { GlobalVariables } from '../shared/global-variables';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks_changed$ = new Subject<Task[]>();

  // private tasks: Task[] = [
  //   new Task(0, "Jan Task1", 0, GlobalVariables.TASK_FINISHED_STATUS, 100),
  //   new Task(1, "Jan Task2", 0, GlobalVariables.TASK_STARTED_STATUS, 50),
  //   new Task(2, "Tomasz Task1", 1, GlobalVariables.TASK_NOT_STARTED_STATUS, 0),
  //   new Task(3, "Jacek Task1", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
  //   new Task(4, "Jacek Task2", 2, GlobalVariables.TASK_FINISHED_STATUS, 100),
  //   new Task(5, "Jacek Task3", 2, GlobalVariables.TASK_FINISHED_STATUS, 100)
  // ];

  constructor(private dataStorageService: DataStorageService) {}

  private tasks: Task[] = [];

  getTasksFromDatabase() {
    this.dataStorageService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.nextTasksChanged();
    });
  }

  postTaskToDatabase(task: Task) {
    this.dataStorageService.postTask(task).subscribe(() => {
      this.getTasksFromDatabase();
    })
  }

  putTaskToDatabase(task: Task) {
    this.dataStorageService.putTask(task).subscribe(() => {
      this.getTasksFromDatabase();
    })
  }

  deleteTaskFromDatabase(id: number) {
    this.dataStorageService.deleteTask(id).subscribe(() => {
      this.getTasksFromDatabase();
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

  addTask(task: Task) {
    this.postTaskToDatabase(task);
  }

  updateTask(task: Task) {
    this.putTaskToDatabase(task);
  }

  removeTask(id: number) {
    this.deleteTaskFromDatabase(id);
  }

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.getStaffMemberTasks(staff_member_id);
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
