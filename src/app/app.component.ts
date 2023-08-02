import { Component, OnInit } from '@angular/core';
import { StaffListService } from './services/staff-list.service';
import { TasksService } from './services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{ 

  constructor(private staffListService: StaffListService,
              private tasksService: TasksService,
              private router: Router) {}

  ngOnInit() {
    this.staffListService.getStaffListFromDatabase();
    this.tasksService.getTasksFromDatabase();
    this.router.navigate(['']);
  }
}