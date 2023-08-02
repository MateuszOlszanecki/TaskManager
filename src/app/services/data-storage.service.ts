import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { StaffListService } from './staff-list.service';
import { map, take } from 'rxjs';
import { StaffMember } from '../models/staff-member.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient) { }

  putStaffList(staff_list: StaffMember[]) {
    this.http
    .put('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json', staff_list)
    .pipe(take(1))
    .subscribe();
  }

  getStaffList() {
    return this.http
    .get<StaffMember[]>('https://taskmanager-cde83-default-rtdb.firebaseio.com/staff_list.json')
    .pipe(take(1), map(res => {
      const staff_list: StaffMember[] = [];
      res.forEach((element: StaffMember) => {
        const staff_member = new StaffMember(
          element.id,
          element.name,
          element.surname,
          element.position
        );
        staff_list.push(staff_member);
      });
      return staff_list;
    }));
  }
}
