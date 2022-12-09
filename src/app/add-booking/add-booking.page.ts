import { Component, OnInit } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-booking',
  templateUrl: './add-booking.page.html',
  styleUrls: ['./add-booking.page.scss'],
})
export class AddBookingPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object  
  public rooms: Room[]
  public guests: Guest[]
  public now = new Date(Date.now()).toISOString()

  constructor(private gS: GuestService, private rS: RoomService, private fB: FormBuilder, private tC: ToastController, private r: Router, private aR: ActivatedRoute) {
    this.rS.getRooms().subscribe(res => {
      this.rooms = res
    })
  }

  ngOnInit() {
    this.myForm = this.fB.group({
      name: ["", Validators.compose([Validators.required])],
      phone: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)])],
      inDate: ["", Validators.compose([Validators.required])],
      outDate: ["", Validators.compose([Validators.required])],
      room: ["", Validators.compose([Validators.required  ])],
      payment: ["", Validators.compose([Validators.required, Validators.pattern('^[0-9]+$')])]
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
      ],
      'payment': [
        { type: 'required', message: "No dejar el campo vacío, poner un 0" },
        { type: 'pattern', message: "Poner una cantidad numérica" }
      ]
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
        let r: Room = this.rS.getRoomByCode(this.myForm.get('room').value)
        let g: Guest = {
          guestName: this.myForm.get('name').value,
          guestPhone: this.myForm.get('phone').value,
          enterDate: this.myForm.get('inDate').value.split('T')[0],
          leaveDate: this.myForm.get('outDate').value.split('T')[0],
          roomCode: this.myForm.get('room').value,
          payment: this.myForm.get('payment').value,
          roomPrice: r.price.toString(),
          enterCode: r.enterCode.toString()
        }
        this.rS.changeStatus(r)
        this.gS.newGuest(g)
        this.r.navigate(
          ['/admin-view']
        )
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
