import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { GlobalVariables } from '../global-variables';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasks: Task[] = [
    new Task("Jan Task1", 0, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Jan Task2", 0, GlobalVariables.TASK_STARTED_STATUS, 50),
    new Task("Tomasz Task1", 1, GlobalVariables.TASK_FINISHED_STATUS, 100),
    new Task("Tomasz Task2", 1, GlobalVariables.TASK_NOT_STARTED_STATUS, 0),
    new Task("Tomasz Task3", 1, GlobalVariables.TASK_FINISHED_STATUS, 100)
  ];

  getAllTasks() {
    return this.tasks.slice();
  }

  removeStaffMemberTasks(staff_member_id: number) {
    for(let i = this.tasks.length - 1; i >= 0; i--){
      if(this.tasks[i].staff_member_id === staff_member_id){
        this.tasks.splice(i, 1);
      }
    }
  }

  getFinishedTasksRatio(staff_member_id: number) {
    let all_staff_member_tasks = this.tasks.filter(task => {
      return task.staff_member_id === staff_member_id;
    })
    let all_staff_member_finished_tasks = all_staff_member_tasks.filter(task => {
      return task.status === GlobalVariables.TASK_FINISHED_STATUS;
    })

    return "[" + all_staff_member_finished_tasks.length + "/" + all_staff_member_tasks.length + "]";
  }
}
