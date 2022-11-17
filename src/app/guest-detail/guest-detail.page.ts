import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.page.html',
  styleUrls: ['./guest-detail.page.scss'],
})
export class GuestDetailPage implements OnInit {

  public guest: Guest

  constructor(private gS: GuestService, private aR: ActivatedRoute) { }

  ngOnInit() {
    this.aR.queryParams.subscribe(
      (params)=>  {
        this.guest = this.gS.getGuestByPhoneNumber(params.phoneNumber)
      }
    )
    
  }

}
