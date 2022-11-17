import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public guest: Guest;
  public room: Room;
  public lang: string;
  public horario: string;
  public cancel: string;
  public cancelT: string;
  public camaP: string;
  public camaPT: string;
  public age: string
  public ageT: string
  public pay: string
  public payT: string
  public pet: string
  public petT: string
  public child: string
  public childAge: string
  public childAgeT: string
  public childBeha: string
  public childBehaT: string

  constructor(private gS: GuestService, private rS: RoomService) {
  }

  ngOnInit() {
    this.guest = this.gS.getActive()
    this.lang = this.gS.getLang();
    this.checkForLang();
  }

  public checkForLang() {
    switch (this.lang) {
      case 'es':
        this.horario = 'Horarios';
        this.cancel = 'Cancelación de pago';
        this.cancelT = 'Las políticas de cancelación pueden variar según el tipo de alojamiento y' +
          ' las condiciones de la habitación seleccionada. Porfavor comuniquese con un empleado para mas información.';
        this.camaP = 'Políticas de camas adicionales y cunas';
        this.camaPT = 'En este alojamiento no hay cunas ni camas extra.'
        this.age = 'Sin restricción de edad'
        this.ageT = 'No hay edad mínima para el check-in'
        this.pay = 'Forma de pago'
        this.payT = 'Se admite Booking.com o efectivo'
        this.pet = 'Mascotas'
        this.petT = '¡Se admiten Gratis!.'
        this.child = 'Politicas para niños'
        this.childAge = 'Edad'
        this.childAgeT = 'Se pueden alojar niños de cualquier edad'
        this.childBeha = 'Comportamiento'
        this.childBehaT = 'Todos los niños deben estar bajo la supervision de un adulto en todo momento'
        break;
      case 'en':
        this.horario = 'Schedules';
        this.cancel = 'Payment Cancellation';
        this.cancelT = 'Cancelation policy may vary depending on the accommodation and room selected. Please ask our staff ' +
          'for more information on this regard.';
        this.camaP = 'Extra beds & cradles policy';
        this.camaPT = 'In this stablishment we dont have extra beds and cradles.'
        this.age = 'No Age restriction'
        this.ageT = 'No minimum age for check-in'
        this.pay = 'Payment method'
        this.payT = 'Booking.com or cash accepted'
        this.pet = 'Pet'
        this.petT = '¡Pet friendly!.'
        this.child = 'Child policy'
        this.childAge = 'Age'
        this.childAgeT = 'Childs from all ages are accepted'
        this.childBeha = 'Behaviour'
        this.childBehaT = 'Every child must be supervised by an adult at all times'
        break;
      case 'fr':
        this.horario = 'Programme';
        this.cancel = 'Annulation de paiement';
        this.cancelT = 'Les conditions dannulation peuvent varier selon le type dhébergement et les conditions de la chambre choisie. Veuillez contacter un employé pour plus dinformations';
        this.camaP = 'Politiques pour les lits supplémentaires et les berceaux';
        this.camaPT = 'Il ny a pas de berceau ni de lit dappoint dans ce logement'
        this.age = 'Aucune limite dâge'
        this.ageT = 'Il ny a pas dâge minimum pour lenregistrement'
        this.pay = 'Mode de paiement'
        this.payT = 'Booking.com ou espèces acceptées'
        this.pet = 'Animaux domestiques'
        this.petT = '¡Animaux gratuits!.'
        this.child = 'Politiques pour les enfants'
        this.childAge = 'Âge'
        this.childAgeT = 'Les enfants de tout âge peuvent être accueillis'
        this.childBeha = 'Comportement'
        this.childBehaT = 'Tous les enfants doivent être sous la surveillance dun adulte en tout temps'
        break;
    }
  }
}
