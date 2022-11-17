import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.page.html',
  styleUrls: ['./add-booking.page.scss'],
})
export class AddBookingPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object
  public freeRooms: Room[]
  public now = new Date(Date.now()).toISOString()
  public tmrw = new Date(this.now)


  constructor(private gS: GuestService, private rS: RoomService, private fB: FormBuilder, private tC: ToastController) {
    this.freeRooms = this.rS.getFree();
    this.tmrw.setDate(this.tmrw.getDate() + 3);
  }

  ngOnInit() {
    this.myForm = this.fB.group({
      name: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)])],
      inDate: ["", Validators.compose([Validators.required])],
      outDate: ["", Validators.compose([Validators.required])],
      room: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)])]
    });
    this.validationMessages = {
      'name': [
        { type: 'required', message: "Nombre obligatorio" }
      ],
      'phone': [
        { type: 'required', message: "Telefono obligatorio" },
        { type: 'pattern', message: "Número telefónico inválido" },
        { type: 'minLength', message: "El número telefónico debe de ser de 10 dígitos" },
        { type: 'maxLength', message: "El número telefónico debe de ser de 10 dígitos" }
      ],
      'room': [
        { type: 'required', message: "Elige una habitación" },
        { type: 'minLength', message: "Elige una habitación" },
        { type: 'maxLength', message: "Elige una habitación" }
      ],
    }
  }

  public async addBooking() {
    if (this.myForm.valid) {
      let inD = this.newDate(this.myForm.get('inDate').value)
      let ouD = this.newDate(this.myForm.get('outDate').value)
      if (inD > ouD) {
        let toast = await this.tC.create({
          message: 'La fecha de entrada debe ser menor a la de salida',
          duration: 2000
        });
        toast.present();
      } else {
        let g: Guest = {
          guestName: this.myForm.get('name').value,
          guestPhone: this.myForm.get('phone').value,
          enterDate: this.newDate(this.myForm.get('inDate').value),
          leaveDate: this.newDate(this.myForm.get('outDate').value),
          roomCode: this.myForm.get('room').value
        }
        this.gS.addGuest(g)
        let r: Room = this.rS.getFreeRoomByCode(this.myForm.get('room').value)
        this.rS.setOcuppied(r)
        let toast = await this.tC.create({
          message: 'Reservación creada',
          duration: 2000
        });
        toast.present();
        this.myForm.reset();
      }
    }
  }

  public newDate(d: string): Date {
    return new Date(d)
  }
}
