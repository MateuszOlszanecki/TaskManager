import { Component, Input } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-staff-member',
  templateUrl: './staff-member.component.html',
  styleUrls: ['./staff-member.component.css']
})
export class StaffMemberComponent {
  @Input() staff_member!: StaffMember;
  @Input() index!: number;

  constructor(private staffListService: StaffListService,
              private tasksService: TasksService,
              private router: Router,
              private route: ActivatedRoute) {}

  finishedToAllTasksRatio() {
    return this.tasksService.getFinishedTasksRatio(this.index);
  }

  onRemove() {
    this.staffListService.removeStaffMember(this.index);
  }

  onEdit() {
    this.router.navigate(['edit', this.index], {relativeTo: this.route});
  }

  onTasks() {
    this.router.navigate(['tasks', this.index]);
  }
}
