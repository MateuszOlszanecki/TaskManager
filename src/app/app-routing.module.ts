import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { StaffListComponent } from "./staff-list/staff-list.component";
import { EditStaffMemberComponent } from "./staff-list/edit-staff-member/edit-staff-member.component";
import { StaffMemberTasksComponent } from "./staff-member-tasks/staff-member-tasks.component";
import { EditTaskComponent } from "./staff-member-tasks/edit-task/edit-task.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'staff-list', pathMatch: 'full'},
    { path: 'staff-list', component: StaffListComponent, children: [
        { path: 'new', component: EditStaffMemberComponent},
        { path: 'edit/:index', component: EditStaffMemberComponent}
    ]},
    { path: 'tasks/:index', component: StaffMemberTasksComponent , children: [
        { path: 'new', component: EditTaskComponent},
        { path: 'edit/:task_index', component: EditTaskComponent}
    ]}
	//{ path: '**', redirectTo: '/staff-list', pathMatch: 'full' }
]

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
    exports: [RouterModule]
})
export class AppRoutingModule { 

}