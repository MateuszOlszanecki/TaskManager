import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { GlobalVariables } from 'src/app/shared/global-variables';
import { StaffMember } from 'src/app/models/staff-member.model';
import { Task } from 'src/app/models/task.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html'
})
export class MoveTaskComponent implements OnInit, OnDestroy {
  public TASK_NOT_STARTED_STATUS = GlobalVariables.TASK_NOT_STARTED_STATUS;
  public TASK_IN_PROGRESS_STATUS = GlobalVariables.TASK_IN_PROGRESS_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;
  task!: Task;
  searchForm!: FormGroup;
  staff_list_searched!: StaffMember[];
  private subscription!: Subscription;
  picked_staff_member!: StaffMember;
  moveForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tasksService: TasksService,
              private staffListService: StaffListService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        const task_id = +params['task_id'];
        this.task = this.tasksService.getTask(task_id)!;
        this.initSubmitForm();
        this.initMoveForm();
      }
    )
    this.staff_list_searched = this.staffListService.getStaffList();
    this.subscription = this.staffListService.staff_member_picked$.subscribe(
      (picked_staff_member: StaffMember) => {
        this.picked_staff_member = picked_staff_member;
      }
    )
  }

  initSubmitForm() {
    this.searchForm = new FormGroup({
      'searchText': new FormControl('', CustomValidators.searchValid.bind(this)),
    })
  }

  initMoveForm() {
    this.moveForm = new FormGroup({
      'status': new FormControl(this.task.status)
    })
  }

  onSubmitSearchForm() {
    this.staff_list_searched = this.staffListService.getSearchedStaffMembers(this.searchForm.value['searchText'].trim());
    this.initSubmitForm();
  }

  onSubmitMoveForm() {
    let status = this.moveForm.value['status'].trim();
    if(status !== this.task.status){
      this.task.status = status;
      switch(status) {
        case GlobalVariables.TASK_NOT_STARTED_STATUS:
          this.task.status_of_completion = 0;
          break;
        case GlobalVariables.TASK_IN_PROGRESS_STATUS:
          this.task.status_of_completion = 5;
          break;
        case GlobalVariables.TASK_FINISHED_STATUS:
          this.task.status_of_completion = 100;
          break;
      }
    }
    this.task.staff_member_id = this.picked_staff_member!.id;
    this.tasksService.putTaskToDatabase(this.task);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
    this.initSubmitForm();
    this.initMoveForm();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}