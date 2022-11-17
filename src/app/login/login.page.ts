import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { RoomService } from '../services/room.service';
import { GuestService } from '../services/guest.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public myForm: FormGroup;
  public validationMessages: Object

  constructor(private r: Router, private tC: ToastController, private rS: RoomService, private gS: GuestService, private fB: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fB.group({
      phone: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{10}'), Validators.minLength(10), Validators.maxLength(10)])],
      room: ["", Validators.compose([Validators.required, Validators.pattern('[0-9]{3}'), Validators.minLength(3), Validators.maxLength(3)])],
      lang: ["", Validators.compose([Validators.required])]
    })
    this.validationMessages = {
      'phone': [
        { type: 'required', message: "Teléfono obligatorio" },
        { type: 'pattern', message: "Número telefónico inválido"},
        { type: 'minLength', message: "El número telefónico debe de ser de 10 dígitos" },
        { type: 'maxLength', message: "El número telefónico debe de ser de 10 dígitos" }
      ],
      'room': [
        { type: 'required', message: "Codigo de habitación obligatorio" },
        { type: 'pattern', message: "Código de habitación inválido"},
        { type: 'minLength', message: "El código de habitación debe de ser de 3 dígitos" },
        { type: 'maxLength', message: "El código de habitación debe de ser de 3 dígitos" },
      ],
      'lang': [
        { type: 'required', message: "Elige un idioma" }
      ],
    }
  }


  async login() {
    if (this.myForm.get('phone').value == "Admin" && this.myForm.get('room').value == "test") {
      this.r.navigate(
        ['/admin-view']
      )
      this.myForm.reset()
      return
    }
    if (this.myForm.valid) {
      if (this.reservaValida()) {
        this.gS.setActive(this.gS.getGuestByPhoneNumber(this.myForm.get('phone').value))
        this.gS.setLang(this.checkForLang(this.myForm.get('lang').value));
        this.r.navigate(['/tabs/tab2'], {})
        this.myForm.reset()
      } else {
        let toast = await this.tC.create({
          message: 'Credenciales no válidas',
          duration: 2000
        });
        toast.present();
      }
    } else {
      let toast = await this.tC.create({
        message: 'Llene los campos correctamente',
        duration: 2000
      });
      toast.present();
    }

  }

  checkForLang(s: string): string {
    switch (s) {
      case 'Espanol':
        return 'es'
      case 'Ingles':
        return 'en'
      case 'Frances':
        return 'fr'
    }
  }

  reservaValida(): Boolean {
    let b = this.gS.getGuestByPhoneNumber(this.myForm.get('phone').value)
    if (b) {
      if (b.roomCode.toString() == this.myForm.get('room').value) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

}
