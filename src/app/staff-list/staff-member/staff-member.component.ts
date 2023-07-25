import { Component, Input } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';

@Component({
  selector: 'app-staff-member',
  templateUrl: './staff-member.component.html',
  styleUrls: ['./staff-member.component.css']
})
export class StaffMemberComponent {
  @Input() staff_member!: StaffMember;
  @Input() index!: number;

  constructor(private staffListService: StaffListService) {}

  finishedToAllTasksRatio() {
    return "[" + this.staffListService.getFinishedTasksNumber(this.index) + "/" + this.staff_member.tasks.length + "]";
  }

  onRemove() {
    this.staffListService.removeStaffMember(this.index);
  }
}
