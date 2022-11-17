import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  public guest: Guest
  public lang: string
  public welcome: string
  public tab1: string
  public tab2: string
  public tab3: string

  constructor(private gS:GuestService) { 
  }
  
  ngOnInit(){
    this.guest = this.gS.getActive()
    this.lang = this.gS.getLang()
    this.checkForLang();
  }

  public checkForLang(){
    switch(this.lang){
      case 'es':
        this.welcome = '¡Bienvenido al Hotel Tigres del Tec!';
        this.tab1 = 'Reglas'
        this.tab2 = 'Check-In & Check-Out'
        this.tab3 = 'Actividades'
        break;
      case 'en':
        this.welcome = '¡Welcome to Hotel Tigres del Tec!';
        this.tab1 = 'Rules'
        this.tab2 = 'Check-In & Check-Out'
        this.tab3 = 'Activities'
        break;
      case 'fr':
        this.welcome = '!Bienvenue à Hotel Tigres del Tec!';
        this.tab1 = 'Règles'
        this.tab2 = 'Check-In & Check-Out'
        this.tab3 = 'Activités'
        break;
    }
  }

}
