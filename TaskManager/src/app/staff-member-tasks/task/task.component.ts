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
    }, CustomValidators.statusValid.bind(this))
  }

  onSubmit() {
    let task = new Task(
      this.task.id,
      this.task.description,
      this.task.staff_member_id,
      this.taskStatusForm.value['status'].trim(),
      this.taskStatusForm.value['status_of_completion'] //this is number, so no trim()
    )
    this.tasksService.updateTask(task);
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
  
  onCancel() {
    this.initForm();
  }
}