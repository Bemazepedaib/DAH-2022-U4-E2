import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { PhotoService } from '../services/photo.service';
 
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  public guest: Guest;
  public lang: string;
  public imageUploads: string[];
  public text: string

  constructor(private gS:GuestService, private pS:PhotoService) {
    this.imageUploads = this.pS.getPhotos(this.gS.getActive().roomCode)
  }

  ngOnInit(){
    this.guest = this.gS.getActive()
    this.lang = this.gS.getLang();
    this.checkForLang();
  }

  public async takePhoto() {
    let b = await this.pS.newPhoto(this.gS.getActive().roomCode)
    console.log(b)
  }

  public checkForLang() {
    switch (this.lang) {
      case 'es':
        this.text = "Tomar o subir fotografia"
        break;
      case 'en':
        this.text = "Take or upload photo"
        break;
      case 'fr':
        this.text = "Prendre ou télécharger une photo"
        break;
    }
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.imageUploads = []
      this.imageUploads = this.pS.getPhotos("101")
      event.target.complete();
    }, 2000);
  };

}
