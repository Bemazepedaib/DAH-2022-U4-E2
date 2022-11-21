import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-guest-detail',
  templateUrl: './guest-detail.page.html',
  styleUrls: ['./guest-detail.page.scss'],
})
export class GuestDetailPage implements OnInit {

  public guest: Guest
  public room: Room
  public url: string
  p

  constructor(private gS: GuestService, private aR: ActivatedRoute, private rS: RoomService) { }

  ngOnInit() {
    this.aR.queryParams.subscribe(
      (params)=>  {
        this.guest = this.gS.getGuestByPhoneNumber(params.phoneNumber)
      }
    )
    this.room = this.rS.getOccupiedRoomByCode(this.guest.roomCode)
    this.url = "https://wa.me/511"+this.guest.guestPhone+"?text=Hola"
  }

}
