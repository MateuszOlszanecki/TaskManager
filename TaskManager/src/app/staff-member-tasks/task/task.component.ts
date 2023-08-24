import { Component, Input, OnInit } from '@angular/core';
import { GlobalVariables } from '../../shared/global-variables';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  public TASK_NOT_STARTED_STATUS = GlobalVariables.TASK_NOT_STARTED_STATUS;
  public TASK_IN_PROGRESS_STATUS = GlobalVariables.TASK_IN_PROGRESS_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;
  @Input() task!: Task;
  taskStatusForm!: FormGroup;
  form_changed!: boolean;

  constructor(private tasksService: TasksService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form_changed = false;
    this.taskStatusForm = new FormGroup({
      'status': new FormControl(this.task.getStatus()),
      'progress': new FormControl(this.task.progress)
    })
  }

  onSubmit() {
    this.task.progress = this.taskStatusForm.value['progress'];
    this.tasksService.putTaskToDatabase(this.task, false);
    this.initForm();
  }

  onRemove() {
    this.tasksService.deleteTaskFromDatabase(this.task.id);
  }

  onEdit() {
    this.router.navigate(['edit', this.task.id], {relativeTo: this.route});
  }

  onMove() {
    this.router.navigate(['move', this.task.id], {relativeTo: this.route});
  }

  onSelectChange() {
    let status = this.taskStatusForm.value['status'].trim();
    switch(status) {
      case GlobalVariables.TASK_NOT_STARTED_STATUS:
        this.taskStatusForm.value['progress'] = 0;
        break;
      case GlobalVariables.TASK_IN_PROGRESS_STATUS:
        this.taskStatusForm.value['progress'] = 5;
        break;
      case GlobalVariables.TASK_FINISHED_STATUS:
        this.taskStatusForm.value['progress'] = 100;
        break;
    }
    if(this.taskStatusForm.value['progress'] === this.task.progress) {
      this.form_changed = false;
    }
    else {
      this.form_changed = true;
    }
  }

  onRangeChange() {
    let progress = this.taskStatusForm.value['progress'];
    if(progress === 0) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_NOT_STARTED_STATUS;
    }
    else if(0 < progress && progress < 100) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_IN_PROGRESS_STATUS;
    }
    else if(progress === 100) {
      this.taskStatusForm.value['status'] = GlobalVariables.TASK_FINISHED_STATUS;
    }
    if(this.taskStatusForm.value['progress'] === this.task.progress) {
      this.form_changed = false;
    }
    else {
      this.form_changed = true;
    }
  }
  
  onCancel() {
    this.initForm();
  }
}