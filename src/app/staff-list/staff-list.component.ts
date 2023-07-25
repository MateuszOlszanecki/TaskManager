import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffListService } from '../services/staff-list.service';
import { StaffMember } from '../models/staff-member.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent implements OnInit, OnDestroy {
  staff_list!: StaffMember[];
  private subscription!: Subscription;

  constructor(private staffListService: StaffListService) {}

  ngOnInit() {
    this.staff_list = this.staffListService.getStaffList();
    this.subscription = this.staffListService.staff_list_changed$.subscribe(
      (staff_list: StaffMember[]) => {
        this.staff_list = staff_list;
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
