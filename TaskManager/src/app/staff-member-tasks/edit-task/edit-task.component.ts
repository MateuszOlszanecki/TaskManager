import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TasksService } from 'src/app/services/tasks.service';
import { StaffMemberTasksComponent } from '../staff-member-tasks.component';
import { Task } from 'src/app/models/task.model';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html'
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task_id!: number;
  edit_mode!: boolean;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private tasksService: TasksService,
              private staffMemberTasksComponent: StaffMemberTasksComponent) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.task_id = +params['task_id']
        this.edit_mode = params['task_id'] != null
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
      'description': new FormControl(description, [Validators.required, CustomValidators.onlySpaces]),
    })
  }

  onSubmit() {
    if(this.edit_mode){
      let task = new Task(
        this.tasksService.getTask(this.task_id)!.id,
        this.taskForm.value['description'].trim(),
        this.tasksService.getTask(this.task_id)!.staff_member_id,
        this.tasksService.getTask(this.task_id)!.status,
        this.tasksService.getTask(this.task_id)!.status_of_completion,
      )
      this.tasksService.updateTask(this.task_id, task!);
    }
    else{
      let task = new Task(
        0,
        this.taskForm.value['description'].trim(),
        this.staffMemberTasksComponent.staff_member_id
      );
      this.tasksService.addTask(task);
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
    this.initForm();
  }
}
