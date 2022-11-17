import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public guest: Guest;
  public room: Room;
  public lang: string;
  public entr: string;
  public sald: string;
  public recom: string;
  public recom1: string;
  public recom2: string;
  public recom3: string;
  public token: string;
  public now = new Date(Date.now())

  constructor(private gS: GuestService, private rS: RoomService) {
  }

  ngOnInit() {
    this.guest = this.gS.getActive();
    this.room = this.rS.getOccupiedRoomByCode(this.guest.roomCode)
    this.lang = this.gS.getLang();
    this.checkForLang();
  }

  public fechaActual() {
    if (((this.guest.enterDate.getFullYear() <= this.now.getFullYear()) &&
      (this.guest.enterDate.getMonth() <= this.now.getMonth()) &&
      (this.guest.enterDate.getDate() <= this.now.getDate())) &&
      ((this.guest.leaveDate.getFullYear() >= this.now.getFullYear()) &&
        (this.guest.leaveDate.getMonth() >= this.now.getMonth()) &&
        (this.guest.leaveDate.getDate() >= this.now.getDate()))) {
      return true
    } else {
      return false
    }
  }

  public checkForLang() {
    switch (this.lang) {
      case 'es':
        this.entr = 'Bienvenid@, puedes hacer tu Check-in a las: '
        this.sald = 'Te recordamos que tienes que hacer tu Check-out a las: '
        this.recom = 'Te recomendamos que: '
        this.recom1 = 'Por seguridad, no podrás ver tu token de entrada hasta la hora de tu check-in.'
        this.recom2 = 'No compartas este token con nadie.'
        this.recom3 = 'Antes de hacer tu Check-out, revisa que todas tus pertenencias estén contigo.'
        this.token = 'Tu token de entrada es: '
        break;
      case 'en':
        this.entr = 'Welcome, you can Check-in at: '
        this.sald = 'We remind you that you must Check-out at: '
        this.recom = 'We recommend you to: '
        this.recom1 = 'For security, you wont see your entrance token until its time for you to Check-in.'
        this.recom2 = 'Dont share this token to nobody.'
        this.recom3 = 'Before you Check-out, see if all of your belongings are with you.'
        this.token = 'Your entrance token is: '
        break;
      case 'fr':
        this.entr = 'Bienvenue, vous pouvez vous enregistrer à: '
        this.sald = 'Nous vous rappelons que vous devez régler au: '
        this.recom = 'Nous recommandons que: '
        this.recom1 = 'Pour des raisons de sécurité, vous ne pourrez voir votre jeton dentrée quau moment de votre enregistrement..'
        this.recom2 = 'Ne partagez ce jeton avec personne.'
        this.recom3 = 'Avant de partir, vérifiez que tous vos effets personnels sont avec vous.'
        this.token = 'Votre jeton dentrée est: '
        break;
    }
  }
}
