import { Component, Input } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent {
  @Input() staff_member_searched!: StaffMember;
  @Input() picked_staff_member!: StaffMember;

  constructor(private staffListService: StaffListService) {}

  onPick() {
    this.staffListService.nextStaffMemberPicked(this.staff_member_searched);
  }

  picked() {
    return this.staff_member_searched === this.picked_staff_member;
  }
}