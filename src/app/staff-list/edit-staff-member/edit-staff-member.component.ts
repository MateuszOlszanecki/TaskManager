import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffMember } from 'src/app/models/staff-member.model';
import { StaffListService } from 'src/app/services/staff-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-staff-member',
  templateUrl: './edit-staff-member.component.html',
  styleUrls: ['./edit-staff-member.component.css']
})
export class EditStaffMemberComponent implements OnInit{
  staffMemberForm!: FormGroup;
  index!: number;
  editMode!: boolean;

  constructor(private staffListService: StaffListService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.index = +params['index']
        this.editMode = params['index'] != null
        this.initForm();
      }
    )
  }

  initForm() {
    let name = "";
    let surname = "";
    let position = "";
    
    if(this.editMode){
      const recipe = this.staffListService.getStaffMember(this.index);
      name = recipe.name;
      surname = recipe.surname;
      position = recipe.position;
    }
    
    this.staffMemberForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'surname': new FormControl(surname, Validators.required),
      'position': new FormControl(position, Validators.required)
    })
  }

  onSubmit(){
    let staff_member = new StaffMember(
      this.staffListService.getNextId(),
      this.staffMemberForm.value['name'],
      this.staffMemberForm.value['surname'],
      this.staffMemberForm.value['position']
    );
    if(this.editMode){
      this.staffListService.updateStaffMember(this.index, staff_member);
    }
    else{
      this.staffListService.addStaffMember(staff_member);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
    this.initForm();
  }
}
