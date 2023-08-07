import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { TasksService } from './tasks.service';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  staff_list_changed$ = new Subject<StaffMember[]>();
  staff_list_searched$ = new Subject<StaffMember[]>();
  staff_member_picked$ = new Subject<StaffMember>();

  // private staff_list: StaffMember[] = [
  //   new StaffMember(0, "Jan", "Kowalski", "Analityk"),
  //   new StaffMember(1, "Tomasz", "Nowak", "Programista"),
  //   new StaffMember(2, "Jacek", "Nowak", "Tester"),
  //   new StaffMember(3, "Mateusz", "Olszanecki", "Programista")
  // ];

  constructor(private dataStorageService: DataStorageService,
              private tasksService: TasksService) {}

  private staff_list: StaffMember[] = [];

  putStaffListToDatabase() {
    this.dataStorageService.putStaffList(this.staff_list);
  }

  getStaffListFromDatabase() {
    this.dataStorageService.getStaffList().subscribe(staff_list => {
      this.staff_list = staff_list
      this.nextStaffListChanged();
    });
  }

  nextStaffListChanged() {
    this.staff_list_changed$.next(this.getStaffList());
  }

  nextStaffListSearched(searched_list: StaffMember[]) {
    this.staff_list_searched$.next(searched_list);
  }

  nextStaffMemberPicked(staff_member: StaffMember) {
    this.staff_member_picked$.next(staff_member);
  }

  getNextId() {
    let unique_id: number = new Date().valueOf();
    return unique_id;
  }

  getStaffList() {
    return this.staff_list.slice();
  }

  getStaffMember(id: number) {
    return this.getStaffList().find(staff_member => {return staff_member.id === id});
  }

  getStaffMemberIndex(id: number) {
    return this.getStaffList().findIndex(staff_member => {return staff_member.id === id});
  }

  getSearchedStaffMembers(search: string) {
    let searchArray: string[] = search.toLowerCase().split(' ');
    searchArray = searchArray.filter(str => {
        return str !== '';
    })
    if(searchArray.length === 1){
      this.nextStaffListSearched(this.getStaffList().filter(staff_member => {
        return staff_member.name.toLowerCase().includes(searchArray[0]) || staff_member.surname.toLowerCase().includes(searchArray[0])
      }));
    }
    else if(searchArray.length === 2){
      this.nextStaffListSearched(this.getStaffList().filter(staff_member => {
        return staff_member.name.toLowerCase().includes(searchArray[0]) && staff_member.surname.toLowerCase().includes(searchArray[1])
      }));
    }
    else{
      this.nextStaffListSearched(this.getStaffList());
    }
  }

  addStaffMember(staff_member: StaffMember) {
    this.staff_list.push(staff_member);
    this.putStaffListToDatabase();
    this.nextStaffListChanged();
  }

  updateStaffMember(id: number, staff_member: StaffMember) {
    let index = this.getStaffMemberIndex(id);
    this.staff_list[index] = staff_member;
    this.putStaffListToDatabase();
    this.nextStaffListChanged();
  }

  removeStaffMember(id: number) {
    let index = this.getStaffMemberIndex(id);
    this.staff_list.splice(index, 1);
    this.tasksService.removeStaffMemberTasks(id); //removes all staff member's tasks
    this.putStaffListToDatabase();
    this.nextStaffListChanged();
  }
}
