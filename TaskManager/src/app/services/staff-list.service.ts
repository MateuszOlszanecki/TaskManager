import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Subject } from 'rxjs';
import { DataStorageService } from './data-storage.service';

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

  constructor(private dataStorageService: DataStorageService) {}

  private staff_list: StaffMember[] = [];

  getStaffListFromDatabase() {
    this.dataStorageService.getStaffList().subscribe(staff_list => {
      this.staff_list = staff_list
      this.nextStaffListChanged();
    });
  }

  postStaffMemberToDatabase(staff_member: StaffMember) {
    this.dataStorageService.postStaffMember(staff_member).subscribe(new_staff_member => {
      this.staff_list.push(new_staff_member);
      this.nextStaffListChanged();
    })
  }

  putStaffMemberToDatabese(staff_member: StaffMember) {
    this.dataStorageService.putStaffMember(staff_member).subscribe(() => {
      const index = this.getStaffMemberIndex(staff_member.id);
      this.staff_list[index] = staff_member;
      this.nextStaffListChanged();
    })
  }

  deleteStaffMemberFromDatabase(id: number) {
    this.dataStorageService.deleteStaffMember(id).subscribe(() => {
      const index = this.getStaffMemberIndex(id);
      this.staff_list.splice(index, 1);
      this.nextStaffListChanged();
    })
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
    this.postStaffMemberToDatabase(staff_member);
  }

  updateStaffMember(staff_member: StaffMember) {
    this.putStaffMemberToDatabese(staff_member);
  }

  removeStaffMember(id: number) {
    this.deleteStaffMemberFromDatabase(id);
  }
}
