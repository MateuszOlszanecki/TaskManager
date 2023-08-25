import { AfterContentChecked, Component, Input } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-staff-member',
  templateUrl: './staff-member.component.html'
})
export class StaffMemberComponent implements AfterContentChecked{
  @Input() staff_member!: StaffMember;
  finished_to_all_tasks_ratio!: string;

  constructor(private staffListService: StaffListService,
              private tasksService: TasksService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngAfterContentChecked() {
    this.finished_to_all_tasks_ratio = this.tasksService.getFinishedToAllTasksRatio(this.staff_member.id);
  }

  onRemove() {
    if(this.tasksService.getStaffMemberTasks(this.staff_member.id).length === 0) {
      this.staffListService.deleteStaffMemberFromDatabase(this.staff_member.id);
    }
    else {
      this.router.navigate(['warning', this.staff_member.id], {relativeTo: this.route});
    }
  }

  onEdit() {
    this.router.navigate(['edit', this.staff_member.id], {relativeTo: this.route});
  }

  onTasks() {
    this.router.navigate(['tasks', this.staff_member.id]);
  }
}