import { Component, Input } from '@angular/core';
import { GlobalVariables } from '../../global-variables';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public TASK_NOT_STARTED_STATUS = GlobalVariables.TASK_NOT_STARTED_STATUS;
  public TASK_STARTED_STATUS = GlobalVariables.TASK_STARTED_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;
  @Input() task!: Task;

  constructor(private tasksService: TasksService,
              private route: ActivatedRoute,
              private router: Router,) {}

  onRemove() {
    this.tasksService.removeTask(this.task.id);
  }

  onEdit() {
    this.router.navigate(['edit', this.task.id], {relativeTo: this.route});
  }
}