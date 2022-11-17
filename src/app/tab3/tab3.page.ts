import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public guest: Guest;
  public room: Room;
  public lang: string;
  public rest: string;
  public restT: string;
  public gym: string;
  public gymT: string;
  public beu: string;
  public beuT: string;
  public rex: string;
  public rexT: string;
  public gam: string;
  public gamT: string;

  constructor(private gS:GuestService, private rS:RoomService) {
  }

  ngOnInit(){
    this.guest = this.gS.getActive()
    this.lang = this.gS.getLang();
    this.checkForLang();
  }

  public checkForLang() {
    switch (this.lang) {
      case 'es':
        this.rest = 'Restaurante'
        this.restT = '¡Ven y disfruta de los platillos que el Hotel tiene que ofrecer!, prueba nuestros camarones huevones'
        this.gym = 'Gimnasio'
        this.gymT = '¡Disfruta de un entrenamiento de fuerza con entrenador y rutina incluida!'
        this.beu = 'Tratamientos de belleza'
        this.beuT = '¡Disfruta de nuestros tratamientos de belleza y conviertete en una princesa!'
        this.rex = 'Tratamientos de relax'
        this.rexT = '¡Disfruta de nuestros increibles masajes!'
        this.gam = 'Sala de juegos'
        this.gamT = '¡Ven y diviertete en nuestra sala de juegos!'
        break;
      case 'en':
        this.rest = 'Restaurant'
        this.restT = '¡Come and enjoy the dishes that the Hotel has to offer! Try our eggless shrimp'
        this.gym = 'Gym'
        this.gymT = '¡Enjoy strength training with a trainer and routine included!'
        this.beu = 'Beauty treatments'
        this.beuT = '¡Enjoy our beauty treatments and become a princess!'
        this.rex = 'Relaxation treatments'
        this.rexT = '¡Enjoy our incredible massages!'
        this.gam = 'Game room'
        this.gamT = '¡Come and have fun in our games room!'
        break;
      case 'fr':
        this.rest = 'Restaurant'
        this.restT = '¡Venez profiter des plats que lHôtel a à vous offrir! essayez nos crevettes sans œufs.'
        this.gym = 'Gym'
        this.gymT = '¡Profitez de lentraînement en force avec un entraîneur et une routine incluse!'
        this.beu = 'Soins de beauté'
        this.beuT = '¡Profitez de nos soins de beauté et devenez une princesse!'
        this.rex = 'Soins relaxants'
        this.rexT = '¡Profitez de nos massages incroyables!'
        this.gam = 'Salle de jeux'
        this.gamT = '¡Venez vous amuser dans notre salle de jeux!'
        break;
    }
  }
}
