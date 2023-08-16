import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../shared/global-variables';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  public TASK_NOT_STARTED_STATUS = GlobalVariables.TASK_NOT_STARTED_STATUS;
  public TASK_STARTED_STATUS = GlobalVariables.TASK_STARTED_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;
  @Input() task!: Task;
  taskStatusForm!: FormGroup;

  constructor(private tasksService: TasksService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.taskStatusForm = new FormGroup({
      'status': new FormControl(this.task.status),
      'status_of_completion': new FormControl(this.task.status_of_completion)
    })
  }

  onSubmit() {
    this.task.status = this.taskStatusForm.value['status'].trim();
    this.task.status_of_completion = this.taskStatusForm.value['status_of_completion']; //this is number, so no trim()
    this.tasksService.updateTask(this.task);
    this.onCancel();
  }

  onRemove() {
    this.tasksService.removeTask(this.task.id);
    this.initForm();
  }

  onEdit() {
    this.router.navigate(['edit', this.task.id], {relativeTo: this.route});
    this.onCancel();
  }

  onMove() {
    this.router.navigate(['move', this.task.id], {relativeTo: this.route});
    this.onCancel();
  }

  onSelectChange() {
    let status = this.taskStatusForm.value['status'].trim();
    switch(status) {
      case GlobalVariables.TASK_NOT_STARTED_STATUS:
        this.taskStatusForm.value['status_of_completion'] = 0;
        break;
      case GlobalVariables.TASK_STARTED_STATUS:
        this.taskStatusForm.value['status_of_completion'] = 5;
        break;
      case GlobalVariables.TASK_FINISHED_STATUS:
        this.taskStatusForm.value['status_of_completion'] = 100;
        break;
    }
  }

  onRangeChange() {
    let status_of_completion = this.taskStatusForm.value['status_of_completion'];
    if(status_of_completion === 0) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_NOT_STARTED_STATUS;
    }
    else if(0 < status_of_completion && status_of_completion < 100) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_STARTED_STATUS;
    }
    else if(status_of_completion === 100) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_FINISHED_STATUS;
    }
  }
  
  onCancel() {
    this.initForm();
  }
}