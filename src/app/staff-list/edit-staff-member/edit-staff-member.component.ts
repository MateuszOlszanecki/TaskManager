import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';

@Component({
  selector: 'app-edit-staff-member',
  templateUrl: './edit-staff-member.component.html',
  styleUrls: ['./edit-staff-member.component.css']
})
export class EditStaffMemberComponent implements OnInit{
  staffMemberForm!: FormGroup;

  constructor(private staffListService: StaffListService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let name = "";
    let surname = "";
    let position = "";
    
    this.staffMemberForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'surname': new FormControl(surname, Validators.required),
      'position': new FormControl(position, Validators.required)
    })
  }

  onSubmit(){
    let staff_member = new StaffMember(
      this.staffMemberForm.value['name'],
      this.staffMemberForm.value['surname'],
      this.staffMemberForm.value['position'],
      []
    );
    this.staffListService.addStaffMember(staff_member)
    this.onCancel();
  }

  onCancel() {
    console.log("Cancel");
  }
}
