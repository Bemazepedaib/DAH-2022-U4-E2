import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.page.html',
  styleUrls: ['./admin-view.page.scss'],
})
export class AdminViewPage implements OnInit {

  public guests: Guest[];
  public rooms: Room[];

  constructor(private gS: GuestService, private rS: RoomService, private aC: AlertController, private r: Router) {
    this.gS.getGuests().subscribe(res => {
      this.guests = res
    })
    this.rS.getRooms().subscribe(res => {
      this.rooms = res
    })
  }

  ngOnInit() { }

  public getGuestByPhoneNumber(pn: string) {
    this.r.navigate(
      ['/guest-detail'],
      {
        queryParams: { phoneNumber: pn }
      })
  }

  public addBooking() {
    this.r.navigate(
      ['/add-booking']
    )
  }

  public async deleteBooking(g: Guest) {
    const alert = await this.aC.create({
      header: 'Confirmación',
      subHeader: '¿Estás seguro que deseas eliminar?',
      message: 'Esto es una confirmación',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { }
        }, {
          text: 'Aceptar',
          role: 'confirm',
          handler: () => {
            this.gS.removeGuest(g.id).subscribe(res => {
              this.guests = res
            })
            this.rooms
            let r: Room = this.getRoomByCode(g.roomCode)
            this.rS.changeStatus(r)
          }
        }
      ]
    });
    await alert.present();
  }

  public newDate(a: any): any {
    var timeStamp = a
    var dateFormat = new Date(timeStamp);
    if ((dateFormat.getDate() + 1) <= 9) {
      return dateFormat.getFullYear() + "-" + (dateFormat.getMonth() + 1) + "-0" + (dateFormat.getDate() + 1)
    } else {
      return dateFormat.getFullYear() + "-" + (dateFormat.getMonth() + 1) + "-" + (dateFormat.getDate() + 1)
    }
  }

  public getRoomByCode(code: string): Room {
    let item = this.rooms.find(
      (room) => {
        return room.roomCode === code;
      }
    );
    return item;
  }

}
