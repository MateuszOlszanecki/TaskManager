import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { GlobalVariables } from 'src/app/shared/global-variables';

@Component({
  selector: 'app-edit-staff-member',
  templateUrl: './edit-staff-member.component.html'
})
export class EditStaffMemberComponent implements OnInit {
  staffMemberForm!: FormGroup;
  staff_member_id!: number;
  edit_mode!: boolean;

  public MAX_LENGTH_INPUT = GlobalVariables.MAX_LENGTH_INPUT;

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
      'name': new FormControl(name, [Validators.required, CustomValidators.onlySpaces, CustomValidators.maxLengthInput]),
      'surname': new FormControl(surname, [Validators.required, CustomValidators.onlySpaces, CustomValidators.maxLengthInput]),
      'position': new FormControl(position, [Validators.required, CustomValidators.onlySpaces, CustomValidators.maxLengthInput])
    })
  }

  nameLength() {
    return this.staffMemberForm.value['name'].trim().length;
  }

  surnameLength() {
    return this.staffMemberForm.value['surname'].trim().length;
  }

  positionLength() {
    return this.staffMemberForm.value['position'].trim().length;
  }

  onSubmit(){
    let staff_member = new StaffMember(
      0,
      this.staffMemberForm.value['name'].trim(),
      this.staffMemberForm.value['surname'].trim(),
      this.staffMemberForm.value['position'].trim()
    );
    if(this.edit_mode){
      staff_member.id = this.staff_member_id;
      this.staffListService.updateStaffMember(staff_member);
    }
    else{
      this.staffListService.addStaffMember(staff_member);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['staff-list']);
    this.initForm();
  }
}
