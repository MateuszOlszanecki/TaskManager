import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomValidators } from 'src/app/custom-validators';
import { GlobalVariables } from 'src/app/global-variables';
import { StaffMember } from 'src/app/models/staff-member.model';
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
  searchForm!: FormGroup;
  staff_list_searched!: StaffMember[];
  private subscription_staff_list_searched!: Subscription;
  private subscription_staff_member_picked!: Subscription;
  picked_staff_member!: StaffMember | null;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private tasksService: TasksService,
              private staffListService: StaffListService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.task_id = +params['task_id'];
        this.initSubmitForm();
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
        console.log(picked_staff_member)
        this.picked_staff_member = picked_staff_member;
      }
    )
  }

  initSubmitForm() {
    this.searchForm = new FormGroup({
      'searchText': new FormControl('', [Validators.required, CustomValidators.searchValid.bind(this)]),
    })
  }

  onSubmitSearch() {
    this.staffListService.getSearchedStaffMembers(this.searchForm.value['searchText']);
    this.initSubmitForm();
  }

  onCancel() {
    this.router.navigate(['../../'], {relativeTo: this.route});
    this.initSubmitForm();
  }

  ngOnDestroy() {
    this.subscription_staff_list_searched.unsubscribe();
    this.subscription_staff_member_picked.unsubscribe();
  }
}
