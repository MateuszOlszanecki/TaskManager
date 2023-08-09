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
  
  // putTasksToDatabase() {
  //   this.dataStorageService.putTasks(this.tasks);
  // }

  // getTasksFromDatabase() {
  //   this.dataStorageService.getTasks().subscribe(tasks => {
  //     this.tasks = tasks
  //     this.nextTasksChanged();
  //   });
  // }

  nextTasksChanged() {
    this.tasks_changed$.next(this.getAllTasks());
  }

  getNextId() {
    let unique_id: number = new Date().valueOf();
    return unique_id;
  }

  getAllTasks() {
    return this.tasks.slice();
  }

  getTask(id: number) {
    return this.getAllTasks().find(task => {return task.id === id});
  }
  
  getTasksIndex(id: number) {
    return this.getAllTasks().findIndex(task => {return task.id === id});
  }

  getStaffMemberTasks(staff_member_id: number) {
    return this.getAllTasks().filter(task => {
      return task.staff_member_id === staff_member_id;
    })
  }

  addTask(task: Task) {
    this.tasks.push(task);
    //this.putTasksToDatabase();
    this.nextTasksChanged();
  }

  updateTask(id: number, task: Task) {
    let index = this.getTasksIndex(id);
    this.tasks[index] = task;
    //this.putTasksToDatabase();
    this.nextTasksChanged();
  }

  moveTask(id: number, staff_member_id_new: number) {
    let index = this.getTasksIndex(id);
    this.tasks[index].staff_member_id = staff_member_id_new;
    //this.putTasksToDatabase();
    this.nextTasksChanged();
  }

  removeTask(id: number) {
    let index = this.getTasksIndex(id);
    this.tasks.splice(index, 1);
    //this.putTasksToDatabase();
    this.nextTasksChanged();
  }

  removeStaffMemberTasks(staff_member_id: number) {
    this.getAllTasks().forEach(task => {
      if(task.staff_member_id === staff_member_id){
        this.removeTask(task.id);
      }
    });
  }

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.getStaffMemberTasks(staff_member_id);
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
