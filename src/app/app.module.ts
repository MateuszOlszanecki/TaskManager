import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { StaffListComponent } from './staff-list/staff-list.component';
import { StaffMemberTasksComponent } from './staff-member-tasks/staff-member-tasks.component';
import { StaffMemberComponent } from './staff-list/staff-member/staff-member.component';
import { TaskComponent } from './staff-member-tasks/task/task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditStaffMemberComponent } from './staff-list/edit-staff-member/edit-staff-member.component';
import { AppRoutingModule } from './app-routing.module';
import { EditTaskComponent } from './staff-member-tasks/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    StaffListComponent,
    StaffMemberTasksComponent,
    StaffMemberComponent,
    TaskComponent,
    EditStaffMemberComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
