import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html'
})
export class WarningComponent implements OnInit {
  staff_member!: StaffMember;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private staffListService: StaffListService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const staff_member_id = +params['staff_member_id'];
        this.staff_member = this.staffListService.getStaffMember(staff_member_id)!;
      }
    )
  }

  onRemove() {
    this.staffListService.deleteStaffMemberFromDatabase(this.staff_member.id);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['staff-list']);
  }
}
