import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StaffMember } from '../models/staff-member.model';
import { StaffListService } from '../services/staff-list.service';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-staff-member-tasks',
  templateUrl: './staff-member-tasks.component.html',
  styleUrls: ['./staff-member-tasks.component.css']
})
export class StaffMemberTasksComponent implements OnInit, OnDestroy {
  staff_member_id!: number;
  picked_staff_member!: StaffMember;
  picked_staff_member_tasks!: Task[];
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private staffListService: StaffListService,
              private tasksService: TasksService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.staff_member_id = +params['staff_member_id'];
      }
    )
    this.picked_staff_member = this.staffListService.getStaffMember(this.staff_member_id)!;
    this.picked_staff_member_tasks = this.tasksService.getStaffMemberTasks(this.staff_member_id);
    this.subscription = this.tasksService.tasks_changed$.subscribe(
      () => {
        this.picked_staff_member_tasks = this.tasksService.getStaffMemberTasks(this.staff_member_id);
      }
    )
  }

  onEdit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  onBack() {
    this.router.navigate(['staff-list']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
