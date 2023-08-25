import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffListComponent } from "../staff-list/staff-list.component";
import { EditStaffMemberComponent } from "../staff-list/edit-staff-member/edit-staff-member.component";
import { StaffMemberTasksComponent } from "../staff-member-tasks/staff-member-tasks.component";
import { EditTaskComponent } from "../staff-member-tasks/edit-task/edit-task.component";
import { MoveTaskComponent } from "../staff-member-tasks/move-task/move-task.component";
import { ErrorComponent } from "./error/error.component";
import { WarningComponent } from "./warning/warning.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'staff-list', pathMatch: 'full'},
    { path: 'staff-list', component: StaffListComponent, children: [
        { path: 'new', component: EditStaffMemberComponent},
        { path: 'edit/:staff_member_id', component: EditStaffMemberComponent},
        { path: 'warning/:staff_member_id', component: WarningComponent}
    ]},
    { path: 'tasks/:staff_member_id', component: StaffMemberTasksComponent , children: [
        { path: 'new', component: EditTaskComponent},
        { path: 'edit/:task_id', component: EditTaskComponent},
        { path: 'move/:task_id', component: MoveTaskComponent}
    ]},
    { path: 'error', component: ErrorComponent },
	{ path: '**', redirectTo: 'staff-list', pathMatch: 'full' }
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' })
	],
    exports: [RouterModule]
})
export class AppRoutingModule {}