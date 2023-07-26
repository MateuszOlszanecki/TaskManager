import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StaffMember } from '../models/staff-member.model';
import { StaffListService } from '../services/staff-list.service';
import { Task } from '../models/task.model';
import { TasksService } from '../services/tasks.service';

@Component({
  selector: 'app-staff-member-tasks',
  templateUrl: './staff-member-tasks.component.html',
  styleUrls: ['./staff-member-tasks.component.css']
})
export class StaffMemberTasksComponent implements OnInit {
  index!: number;
  picked_staff_member!: StaffMember;
  picked_staff_member_tasks!: Task[];

  constructor(private route: ActivatedRoute,
              private staffListService: StaffListService,
              private tasksService: TasksService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['index'];
      }
    )
    this.picked_staff_member = this.staffListService.getStaffMember(this.index);
    this.picked_staff_member_tasks = this.tasksService.getStaffMemberTasks(this.picked_staff_member.id);
  }
}
