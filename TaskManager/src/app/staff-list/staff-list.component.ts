import { Component, OnInit, OnDestroy } from '@angular/core';
import { StaffListService } from '../services/staff-list.service';
import { StaffMember } from '../models/staff-member.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariables } from '../shared/global-variables';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html'
})
export class StaffListComponent implements OnInit, OnDestroy {
  staff_list!: StaffMember[];
  private subscription!: Subscription;
  public CONTENT_LOADED = GlobalVariables.CONTENT_LOADED;

  constructor(private staffListService: StaffListService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.staff_list = this.staffListService.getStaffList();
    this.subscription = this.staffListService.staff_list_changed$.subscribe(
      (staff_list: StaffMember[]) => {
        if(!GlobalVariables.CONTENT_LOADED) {
          GlobalVariables.CONTENT_LOADED = true;
          this.CONTENT_LOADED = GlobalVariables.CONTENT_LOADED;
        }
        
        this.staff_list = staff_list;
      }
    )
  }

  onEdit() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
