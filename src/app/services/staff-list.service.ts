import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';
import { TasksService } from './tasks.service';

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

  first_free_id = this.staff_list.length;

  constructor(private tasksService: TasksService) {}

  nextStaffListChanged() {
    this.staff_list_changed$.next(this.staff_list.slice());
  }

  getNextId() {
    return this.first_free_id++;
  }

  getStaffList() {
    return this.staff_list.slice();
  }

  getStaffMember(index: number) {
    return this.staff_list.slice()[index];
  }

  getStaffMemberId(staff_member_index: number) {
    return this.staff_list[staff_member_index].id;
  }

  updateStaffMember(index: number, staff_member: StaffMember) {
    this.staff_list[index] = staff_member;
    this.nextStaffListChanged();
  }

  removeStaffMember(index: number) {
    this.tasksService.removeStaffMemberTasks(this.staff_list[index].id);
    this.staff_list.splice(index, 1);
    this.nextStaffListChanged();
  }

  addStaffMember(staff_member: StaffMember) {
    this.staff_list.push(staff_member);
    this.nextStaffListChanged();
  }
}
