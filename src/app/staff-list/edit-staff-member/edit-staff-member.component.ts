import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-staff-member',
  templateUrl: './edit-staff-member.component.html'
})
export class EditStaffMemberComponent implements OnInit {
  staffMemberForm!: FormGroup;
  staff_member_id!: number;
  edit_mode!: boolean;

  constructor(private staffListService: StaffListService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.staff_member_id = +params['staff_member_id']
        this.edit_mode = params['staff_member_id'] != null
        this.initForm();
      }
    )
  }

  initForm() {
    let name = "";
    let surname = "";
    let position = "";
    
    if(this.edit_mode){
      const staff_member = this.staffListService.getStaffMember(this.staff_member_id);
      name = staff_member!.name;
      surname = staff_member!.surname;
      position = staff_member!.position;
    }
    
    this.staffMemberForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'surname': new FormControl(surname, Validators.required),
      'position': new FormControl(position, Validators.required)
    })
  }

  onSubmit(){
    let staff_member = new StaffMember(
      -1,
      this.staffMemberForm.value['name'],
      this.staffMemberForm.value['surname'],
      this.staffMemberForm.value['position']
    );
    if(this.edit_mode){
      staff_member.id = this.staff_member_id;
      this.staffListService.updateStaffMember(staff_member.id, staff_member);
    }
    else{
      staff_member.id = this.staffListService.getNextId();
      this.staffListService.addStaffMember(staff_member);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['staff-list']);
    this.initForm();
  }
}
