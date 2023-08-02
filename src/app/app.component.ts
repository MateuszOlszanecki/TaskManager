import { Component, OnInit } from '@angular/core';
import { StaffListService } from './services/staff-list.service';
import { TasksService } from './services/tasks.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{ 

  constructor(private staffListService: StaffListService,
              private tasksService: TasksService) {}

  ngOnInit() {
    this.staffListService.getStaffListFromDatabase();
    this.tasksService.getTasksFromDatabase();
  }
}