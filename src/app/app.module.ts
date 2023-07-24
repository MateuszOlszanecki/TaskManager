import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { AddStaffMemberComponent } from './staff-list/add-staff-member/add-staff-member.component';
import { StaffMemberTasksComponent } from './staff-member-tasks/staff-member-tasks.component';
import { MoveTaskComponent } from './staff-member-tasks/move-task/move-task.component';
import { AddTaskComponent } from './staff-member-tasks/add-task/add-task.component';
import { StaffMemberComponent } from './staff-list/staff-member/staff-member.component';
import { TaskComponent } from './staff-member-tasks/task/task.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    AddStaffMemberComponent,
    StaffMemberTasksComponent,
    MoveTaskComponent,
    AddTaskComponent,
    StaffMemberComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
