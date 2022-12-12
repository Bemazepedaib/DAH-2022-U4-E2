import { Component } from '@angular/core';
import { Guest } from '../models/guest';
import { GuestService } from '../services/guest.service';
import { Room } from '../models/room';
import { PhotoService } from '../services/photo.service';

 
@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {

  public guest: Guest;
  public room: Room;
  public lang: string;
  public imageUploads: string[];
  public imgURL: any
  public text: string

  constructor(private gS:GuestService, private pS:PhotoService) {
    this.pS.getPhotos(this.gS.getActive().roomCode).subscribe(res => {
      this.imageUploads = res
    })
  }

  ngOnInit(){
    this.guest = this.gS.getActive()
    this.lang = this.gS.getLang();
    this.checkForLang();
  }

  public takePhoto() {
    this.pS.takePhoto().then((photo) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        this.pS.uploadPhoto(imgBlob, this.gS.getActive().roomCode)
      };
      fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
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
}
