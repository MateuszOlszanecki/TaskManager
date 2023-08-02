import { Component, OnInit } from '@angular/core';
import { StaffListService } from './services/staff-list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{ 

  constructor(private staffListService: StaffListService) {}

  ngOnInit() {
    this.staffListService.getStaffListFromDatabase();
  }
}