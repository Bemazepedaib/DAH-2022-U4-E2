import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { throws } from 'assert';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.page.html',
  styleUrls: ['./admin-view.page.scss'],
})
export class AdminViewPage implements OnInit {

  public guests: Guest[];
  public rooms: Room[];

  constructor(private gS: GuestService, private rS: RoomService, private aC: AlertController, private r: Router,
    private tC: ToastController) { 
      this.guests=this.gS.getGuests();
  }

  ngOnInit() {
  }

  public getGuestByPhoneNumber(pn: string): void{
    this.r.navigate(
      ['/guest-detail'],
      {
        queryParams: {phoneNumber: pn}
      } )
  }

  public addBooking(){
    this.r.navigate(
      ['/add-booking']
    )
  }

  public async deleteBooking(pos: number){
    const alert = await this.aC.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        },{
          text: 'Aceptar',
          role: 'confirm',
          handler: () => { 
            let g = this.guests[pos].roomCode
            this.rS.setFree(this.rS.getOccupiedRoomByCode(g));
            this.guests = this.gS.deleteGuest(pos); 
          }
        }
      ]
    });
    await alert.present();
  }

}
