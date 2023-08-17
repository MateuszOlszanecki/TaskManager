import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  staff_list_changed$ = new Subject<StaffMember[]>();
  staff_list_searched$ = new Subject<StaffMember[]>();
  staff_member_picked$ = new Subject<StaffMember>();

  constructor(private dataStorageService: DataStorageService,
              private router: Router) {}

  private staff_list: StaffMember[] = [];

  handleError() {
    this.router.navigate(['error']);
  }

  getStaffListFromDatabase() {
    this.dataStorageService.getStaffList().subscribe({
      next: (staff_list) => {
        this.staff_list = staff_list
        this.nextStaffListChanged();
      },
      error: () => this.handleError()
    });
  }

  postStaffMemberToDatabase(staff_member: StaffMember) {
    this.dataStorageService.postStaffMember(staff_member).subscribe({
      next: () => this.getStaffListFromDatabase(),
      error: () => this.handleError()
    });
  }

  putStaffMemberToDatabese(staff_member: StaffMember) {
    this.dataStorageService.putStaffMember(staff_member).subscribe({
      next: () => this.getStaffListFromDatabase(),
      error: () => this.handleError()
    });
  }

  deleteStaffMemberFromDatabase(id: number) {
    this.dataStorageService.deleteStaffMember(id).subscribe({
      next: () => this.getStaffListFromDatabase(),
      error: () => this.handleError()
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

  getStaffList() {
    let staff_list: StaffMember[] = [];
    this.staff_list.forEach(staff_member => {
      staff_list.push(staff_member.deepCopy())
    });
    return staff_list;
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
    if(searchArray.length === 1) {
      this.nextStaffListSearched(this.getStaffList().filter(staff_member => {
        return staff_member.name.toLowerCase().includes(searchArray[0]) || staff_member.surname.toLowerCase().includes(searchArray[0])
      }));
    }
    else if(searchArray.length === 2) {
      this.nextStaffListSearched(this.getStaffList().filter(staff_member => {
        return staff_member.name.toLowerCase().includes(searchArray[0]) && staff_member.surname.toLowerCase().includes(searchArray[1])
      }));
    }
    else {
      this.nextStaffListSearched(this.getStaffList());
    }
  }
}