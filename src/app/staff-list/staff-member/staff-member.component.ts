import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-member',
  templateUrl: './staff-member.component.html',
  styleUrls: ['./staff-member.component.css']
})
export class StaffMemberComponent implements OnInit, OnDestroy {
  @Input() staff_member!: StaffMember;
  @Input() id!: number;
  @Input() index!: number;
  finishedToAllTasksRatio!: string;

  constructor(private staffListService: StaffListService,
              private tasksService: TasksService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.finishedToAllTasksRatio = this.tasksService.getFinishedTasksRatio(this.id);
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

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
}
