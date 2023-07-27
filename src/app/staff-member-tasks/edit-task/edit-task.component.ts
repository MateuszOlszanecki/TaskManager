import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StaffListService } from 'src/app/services/staff-list.service';
import { TasksService } from 'src/app/services/tasks.service';
import { StaffMemberTasksComponent } from '../staff-member-tasks.component';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskForm!: FormGroup;
  task_index!: number;
  editMode!: boolean;
  
  constructor(private router: Router,
              private route: ActivatedRoute,
              private staffListService: StaffListService,
              private tasksService: TasksService,
              private staffMemberTasksComponent: StaffMemberTasksComponent) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.task_index = +params['task_index']
        this.editMode = params['task_index'] != null
        this.initForm();
      }
    )
  }
  
  initForm() {
    let description = "";

    if(this.editMode){
      const task = this.tasksService.getTask(this.task_index);
      description = task.description;
    }
    
    this.taskForm = new FormGroup({
      'description': new FormControl(description, Validators.required),
    })
  }

  onSubmit() {
    if(this.editMode){
      let task = this.tasksService.getTask(this.task_index);
      task.description = this.taskForm.value['description'],
      this.tasksService.updateTask(this.task_index, task);
    }
    else{
      let task = new Task(
        this.taskForm.value['description'],
        this.staffMemberTasksComponent.id
      );
      this.tasksService.addTask(task);
    }
    this.onCancel();
  }
  
  onCancel() {
    if(this.editMode){
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
    else{
      this.router.navigate(['..'], {relativeTo: this.route});
    }
    this.initForm();
  }
}