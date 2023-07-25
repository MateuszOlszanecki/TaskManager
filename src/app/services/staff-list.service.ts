import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  staff_list_changed$ = new Subject<StaffMember[]>();

  private staff_list: StaffMember[] = [
    new StaffMember("Jan", "Kowalski", "Analityk",
    [
      new Task("Tworzenie makiet", GlobalVariables.TASK_FINISHED_STATUS, 100),
      new Task("Analizowanie zadań", GlobalVariables.TASK_NOT_STARTED_STATUS, 0)
    ]),
    new StaffMember("Tomasz", "Nowak", "Programista",
    [
      new Task("Instalacja programu ABC", GlobalVariables.TASK_FINISHED_STATUS, 100),
      new Task("Instalacja programu ABC", GlobalVariables.TASK_STARTED_STATUS, 25),
      new Task("Instalacja programu ABC", GlobalVariables.TASK_STARTED_STATUS, 50),
      new Task("Instalacja programu ABC", GlobalVariables.TASK_FINISHED_STATUS, 100)
    ])
  ]

  nextStaffListChanged() {
    this.staff_list_changed$.next(this.staff_list.slice());
  }

  getStaffList() {
    return this.staff_list.slice();
  }

  getStaffMember(index: number) {
    return this.staff_list.slice()[index];
  }

  updateStaffMember(index: number, staff_member: StaffMember) {
      this.staff_list[index] = staff_member;
      this.nextStaffListChanged();
  }

  removeStaffMember(index: number) {
    this.staff_list.splice(index, 1);
    this.nextStaffListChanged();
  }

  addStaffMember(staff_member: StaffMember) {
    this.staff_list.push(staff_member);
    this.nextStaffListChanged();
  }

  getFinishedTasksNumber(index: number) {
    return this.getStaffList()[index].tasks.filter(task => {
      if(task.status === GlobalVariables.TASK_FINISHED_STATUS){
        return true;
      }
      return false;
    }).length;
  }
}
