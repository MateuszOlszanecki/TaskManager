import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { Task } from 'src/app/models/task.model';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { GlobalVariables } from 'src/app/shared/global-variables';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task_id!: number;
  staff_member_id!: number;
  edit_mode!: boolean;

  public MAX_LENGTH_TEXT_AREA = GlobalVariables.MAX_LENGTH_TEXT_AREA;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private tasksService: TasksService) {}

  ngOnInit() {
    this.route.parent!.params.subscribe(
      (params: Params) => {
        this.staff_member_id = +params['staff_member_id'];
      }
    )
    this.route.params.subscribe(
      (params: Params) => {
        this.task_id = +params['task_id'];
        this.edit_mode = params['task_id'] != null;
        this.initForm();
      }
    )
  }
  
  initForm() {
    let description = "";

    if(this.edit_mode){
      const task = this.tasksService.getTask(this.task_id);
      description = task!.description;
    }
    
    this.taskForm = new FormGroup({
      'description': new FormControl(description, [Validators.required, Validators.maxLength(GlobalVariables.MAX_LENGTH_TEXT_AREA), CustomValidators.onlySpaces]),
    })
  }

  descriptionLength() {
    return this.taskForm.value['description'].trim().length;
  }

  onSubmit() {
    let task = new Task(
      0,
      this.taskForm.value['description'].trim(),
      this.staff_member_id
    );
    if(this.edit_mode) {
      task.id = this.task_id;
      task.status = this.tasksService.getTask(this.task_id)!.status;
      task.status_of_completion = this.tasksService.getTask(this.task_id)!.status_of_completion;
      this.tasksService.putTaskToDatabase(task!);
    }
    else {
      this.tasksService.postTaskToDatabase(task);
    }
    this.onCancel();
  }
  
  onCancel() {
    if(this.edit_mode){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else{
      this.router.navigate(['..'], {relativeTo: this.route});
    }
  }
}
