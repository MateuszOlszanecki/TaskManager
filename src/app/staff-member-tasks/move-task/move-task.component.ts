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
  public TASK_STARTED_STATUS = GlobalVariables.TASK_STARTED_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;
  task_id!: number;
  task!: Task;
  searchForm!: FormGroup;
  staff_list_searched!: StaffMember[];
  private subscription_staff_list_searched!: Subscription;
  private subscription_staff_member_picked!: Subscription;
  picked_staff_member!: StaffMember | null;
  moveForm!: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tasksService: TasksService,
              private staffListService: StaffListService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.task_id = +params['task_id'];
        this.task = this.tasksService.getTask(this.task_id)!;
        this.initSubmitForm();
        this.initMoveForm();
      }
    )
    this.staff_list_searched = this.staffListService.getStaffList();
    this.subscription_staff_list_searched = this.staffListService.staff_list_searched$.subscribe(
      (staff_list_searched: StaffMember[]) => {
        this.staff_list_searched = staff_list_searched;
      }
    )
    this.subscription_staff_member_picked = this.staffListService.staff_member_picked$.subscribe(
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
    this.staffListService.getSearchedStaffMembers(this.searchForm.value['searchText']);
    this.initSubmitForm();
  }

  onSubmitMoveForm() {
    let status_of_completion = this.task.status_of_completion;
    let status = this.moveForm.value['status'];
    if(status !== this.task.status){
      switch (status) {
        case GlobalVariables.TASK_NOT_STARTED_STATUS:
          status_of_completion = 0;
          break;
        case GlobalVariables.TASK_STARTED_STATUS:
          status_of_completion = 25;
          break;
        case GlobalVariables.TASK_FINISHED_STATUS:
          status_of_completion = 100;
          break;
      }
    }
    let movedTask = new Task(
      this.task_id,
      this.task.description,
      this.picked_staff_member!.id,
      status,
      status_of_completion
    )
    this.tasksService.updateTask(this.task_id, movedTask);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
    this.initSubmitForm();
    this.initMoveForm();
  }

  ngOnDestroy() {
    this.subscription_staff_list_searched.unsubscribe();
    this.subscription_staff_member_picked.unsubscribe();
  }
}
