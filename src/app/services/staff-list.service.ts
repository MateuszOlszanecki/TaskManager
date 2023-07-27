import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';
import { TasksService } from './tasks.service';
import { deepCopy } from '@angular-devkit/core/src/utils/object';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  staff_list_changed$ = new Subject<StaffMember[]>();

  private staff_list: StaffMember[] = [
    new StaffMember(0, "Jan", "Kowalski", "Analityk"),
    new StaffMember(1, "Tomasz", "Nowak", "Programista"),
    new StaffMember(2, "Jacek", "Nowak", "Programista")
  ];

  first_free_id = 3;

  constructor(private tasksService: TasksService) {}

  nextStaffListChanged() {
    this.staff_list_changed$.next(this.getStaffList());
  }

  getNextId() {
    return this.first_free_id++;
  }

  getStaffList() {
    //deepcopy array
    return deepCopy(this.staff_list);
  }

  getStaffMember(id: number) {
    return this.staff_list.find(staff_member => {return staff_member.id === id});
  }

  getStaffMemberIndex(id: number) {
    return this.staff_list.findIndex(staff_member => {return staff_member.id === id});
  }

  updateStaffMember(id: number, staff_member: StaffMember) {
    let index = this.getStaffMemberIndex(id);
    this.staff_list[index] = staff_member;
    this.nextStaffListChanged();
  }

  removeStaffMember(id: number) {
    let index = this.getStaffMemberIndex(id);
    this.tasksService.removeStaffMemberTasks(id);
    this.staff_list.splice(index, 1);
    this.nextStaffListChanged();
  }

  addStaffMember(staff_member: StaffMember) {
    this.staff_list.push(staff_member);
    this.nextStaffListChanged();
  }
}
