import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  staff_list_changed$ = new Subject<StaffMember[]>();

  private staff_list: StaffMember[] = [
    new StaffMember("Jan", "Kowalski", "Analityk"),
    new StaffMember("Tomasz", "Nowak", "Programista")
  ];

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

  // getFinishedTasksNumber(index: number) {
  //   return this.getStaffList()[index].tasks.filter(task => {
  //     if(task.status === GlobalVariables.TASK_FINISHED_STATUS){
  //       return true;
  //     }
  //     return false;
  //   }).length;
  // }
}
