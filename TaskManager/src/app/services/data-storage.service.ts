import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, take } from 'rxjs';
import { StaffMember } from '../models/staff-member.model';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  // THIS IS CODE FOR CONNECTING WITH FIREBASE DATABASE
  // constructor(private http: HttpClient) { }

  // putStaffList(staff_list: StaffMember[]) {
  //   this.http
  //   .put('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json', staff_list)
  //   .pipe(take(1))
  //   .subscribe();
  // }

  // getStaffList() {
  //   return this.http
  //   .get<StaffMember[]>('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json')
  //   .pipe(take(1), map(res => {
  //     const staff_list: StaffMember[] = [];
  //     if(res !== null){
  //       res.forEach((element: StaffMember) => {
  //         const staff_member = new StaffMember(
  //           element.id,
  //           element.name,
  //           element.surname,
  //           element.position
  //         );
  //         staff_list.push(staff_member);
  //       });
  //     }
  //     return staff_list;
  //   }));
  // }

  // putTasks(tasks: Task[]) {
  //   this.http
  //   .put('https://taskmanager-cde83-default-rtdb.firebaseio.com/tasks.json', tasks)
  //   .pipe(take(1))
  //   .subscribe();
  // }

  // getTasks() {
  //   return this.http
  //   .get<Task[]>('https://taskmanager-cde83-default-rtdb.firebaseio.com/tasks.json')
  //   .pipe(take(1), map(res => {
  //     const tasks: Task[] = [];
  //     if(res !== null){
  //       res.forEach((element: Task) => {
  //         const task = new Task(
  //           element.id,
  //           element.description,
  //           element.staff_member_id,
  //           element.status,
  //           element.status_of_completion
  //         )
  //         tasks.push(task);
  //       });
  //     }
  //     return tasks;
  //   }));
  // }

  private API_LINK = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

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
    .post<StaffMember>(this.API_LINK + '/staff-list', staff_member)
    .pipe(take(1), map(res => {
      const new_staff_member = new StaffMember(
        res.id,
        res.name,
        res.surname,
        res.position
      )
      return new_staff_member;
    }));
  }

  postTask(task: Task) {
    return this.http
    .post<Task>(this.API_LINK + '/tasks', task)
    .pipe(take(1), map(res => {
      const new_task = new Task(
        res.id,
        res.description,
        res.staff_member_id,
        res.status,
        res.status_of_completion
      )
      return new_task;
    }));
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
