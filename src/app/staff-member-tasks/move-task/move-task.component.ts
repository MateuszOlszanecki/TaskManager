import { Component } from '@angular/core';
import { GlobalVariables } from 'src/app/global-variables';

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html'
})
export class MoveTaskComponent {
  public TASK_NOT_STARTED_STATUS = GlobalVariables.TASK_NOT_STARTED_STATUS;
  public TASK_STARTED_STATUS = GlobalVariables.TASK_STARTED_STATUS;
  public TASK_FINISHED_STATUS = GlobalVariables.TASK_FINISHED_STATUS;

}
