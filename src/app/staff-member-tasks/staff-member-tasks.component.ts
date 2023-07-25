import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StaffMember } from '../models/staff-member.model';
import { StaffListService } from '../services/staff-list.service';

@Component({
  selector: 'app-staff-member-tasks',
  templateUrl: './staff-member-tasks.component.html',
  styleUrls: ['./staff-member-tasks.component.css']
})
export class StaffMemberTasksComponent implements OnInit {
  id!: number;
  picked_staff_member!: StaffMember;

  constructor(private route: ActivatedRoute,
              private staffListService: StaffListService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
      }
    )
    this.picked_staff_member = this.staffListService.getStaffMember(this.id);
  }
}
