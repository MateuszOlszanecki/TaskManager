import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { GlobalVariables } from '../global-variables';
import { StaffListService } from './staff-list.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    new Task("Tworzenie makie", 0, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Analizowanie za", 1, GlobalVariables.TASK_NOT_STARTED_STATUS, 0),
    new Task("Analizowanie ff", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Analizowanie tt", 0, GlobalVariables.TASK_STARTED_STATUS, 50),
    new Task("Analizowanie 33", 1, GlobalVariables.TASK_FINISHED_STATUS, 100)
  ];

  getFinishedTasksRatio(staff_member_index: number) {
    let all_staff_member_tasks = this.tasks.filter(task => {
      return task.staff_member_id === staff_member_index;
    })
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
