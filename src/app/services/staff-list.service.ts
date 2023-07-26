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
    new StaffMember(1, "Tomasz", "Nowak", "Programista")
  ];

  constructor(private tasksService: TasksService) {}

  getNextId() {
    return this.staff_list.length;
  }

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
    console.log(this.tasksService.getAllTasks());
    this.tasksService.removeStaffMemberTasks(index);
    console.log(this.tasksService.getAllTasks());
    this.nextStaffListChanged();
  }

  addStaffMember(staff_member: StaffMember) {
    this.staff_list.push(staff_member);
    this.nextStaffListChanged();
  }
}
