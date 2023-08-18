import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, take } from 'rxjs';
import { StaffMember } from '../models/staff-member.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private API_LINK = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getStaffList() {
    return this.http
    .get<StaffMember[]>(this.API_LINK + '/staff-list')
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

  getTasks() {
    return this.http
    .get<Task[]>(this.API_LINK + '/tasks')
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

  postStaffMember(staff_member: StaffMember) {
    return this.http
    .post<number>(this.API_LINK + '/staff-list', staff_member)
    .pipe(take(1));
  }

  postTask(task: Task) {
    return this.http
    .post<number>(this.API_LINK + '/tasks', task)
    .pipe(take(1));
  }

  putStaffMember(staff_member: StaffMember) {
    return this.http
    .put(this.API_LINK + '/staff-list', staff_member)
    .pipe(take(1));
  }

  putTask(task: Task) {
    return this.http
    .put(this.API_LINK + '/tasks', task)
    .pipe(take(1));
  }

  deleteStaffMember(id: number) {
    return this.http
    .delete(this.API_LINK + '/staff-list/' + id)
    .pipe(take(1));
  }

  deleteTask(id: number) {
    return this.http
    .delete(this.API_LINK + '/tasks/' + id)
    .pipe(take(1));
  }
}