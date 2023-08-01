import { Component, Input } from '@angular/core';
import { StaffMember } from 'src/app/models/staff-member.model';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent {
  @Input() staff_member_searched!: StaffMember;
}
