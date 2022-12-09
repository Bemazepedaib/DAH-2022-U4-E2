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
  public mess: string

  constructor(private gS: GuestService, private aR: ActivatedRoute, private rS: RoomService) { }

  ngOnInit() {
    this.aR.queryParams.subscribe(
      (params)=>  {
        this.guest = this.gS.getGuestByPhoneNumber(params.phoneNumber)
      }
    )
    this.mess = "Hola tus credenciales de acceso son: Usuario: " + this.guest.guestPhone + " , Contraseña: " + this.guest.roomCode
    this.room = this.rS.getRoomByCode(this.guest.roomCode)
  }

  public sendMessage(){
    window.open("https://wa.me/52"+this.guest.guestPhone+"?text="+this.mess)
  }

  public newDate(a: any): any{
    var timeStamp = a
    var dateFormat = new Date(timeStamp);
    if ((dateFormat.getDate()+1)<=9){
      return dateFormat.getFullYear()+"-"+(dateFormat.getMonth()+1)+"-0"+(dateFormat.getDate()+1)
    } else {
      return dateFormat.getFullYear()+"-"+(dateFormat.getMonth()+1)+"-"+(dateFormat.getDate()+1)
    }
  }
}
