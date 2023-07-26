import { Component, Input } from '@angular/core';
import { GlobalVariables } from '../../global-variables';
import { Task } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks.service';

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
  @Input() task_index!: number;

  constructor(private tasksService: TasksService) {}

  onRemove() {
    this.tasksService.removeTask(this.task_index);
  }
}