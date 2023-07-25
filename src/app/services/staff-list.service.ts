import { Injectable } from '@angular/core';
import { StaffMember } from '../models/staff-member.model';
import { Task } from '../models/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffListService {
  private TASK_NOT_STARTED = "Nie rozpoczęte";
  private TASK_IN_PROGRESS = "W realizacji";
  private TASK_FINISHED = "Zakończone";

  staff_list_changed$ = new Subject<StaffMember[]>();

  private staff_list: StaffMember[] = [
    new StaffMember("Jan", "Kowalski", "Programista",
    [
      new Task("Tworzenie makiet", this.TASK_NOT_STARTED, 0),
      new Task("Analizowanie zadań", this.TASK_IN_PROGRESS, 25)
    ]),
    new StaffMember("Tomasz", "Nowak", "Programista",
    [
      new Task("Instalacja programu ABC", this.TASK_FINISHED, 100),
      new Task("Instalacja programu ABC", this.TASK_FINISHED, 100),
      new Task("Instalacja programu ABC", this.TASK_IN_PROGRESS, 50),
      new Task("Instalacja programu ABC", this.TASK_FINISHED, 100)
    ])
  ]

  getStaffList() {
    return this.staff_list.slice();
  }

  removeStaffMember(index: number) {
    this.staff_list.splice(index, 1);
    this.staff_list_changed$.next(this.staff_list.slice());
  }

  getFinishedTasksNumber(index: number) {
    return this.getStaffList()[index].tasks.filter(task => {
      if(task.status === this.TASK_FINISHED){
        return true;
      }
      return false;
    }).length;
  }
}
