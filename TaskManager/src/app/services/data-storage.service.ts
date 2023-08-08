import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, take } from 'rxjs';
import { StaffMember } from '../models/staff-member.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) { }

  putStaffList(staff_list: StaffMember[]) {
    this.http
    .put('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json', staff_list)
    .pipe(take(1))
    .subscribe();
  }

  getStaffList() {
    return this.http
    .get<StaffMember[]>('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json')
    .pipe(take(1), map(res => {
      const staff_list: StaffMember[] = [];
      if(res !== null){
        res.forEach((element: StaffMember) => {
          const staff_member = new StaffMember(
            element.id,
            element.name,
            element.surname,
            element.position
          );
          staff_list.push(staff_member);
        });
      }
      return staff_list;
    }));
  }

  putTasks(tasks: Task[]) {
    this.http
    .put('https://taskmanager-cde83-default-rtdb.firebaseio.com/tasks.json', tasks)
    .pipe(take(1))
    .subscribe();
  }

  getTasks() {
    return this.http
    .get<Task[]>('https://taskmanager-cde83-default-rtdb.firebaseio.com/tasks.json')
    .pipe(take(1), map(res => {
      const tasks: Task[] = [];
      if(res !== null){
        res.forEach((element: Task) => {
          const task = new Task(
            element.id,
            element.description,
            element.staff_member_id,
            element.status,
            element.status_of_completion
          )
          tasks.push(task);
        });
      }
      return tasks;
    }));
  }
}