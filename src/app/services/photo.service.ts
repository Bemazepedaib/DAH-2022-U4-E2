import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uuidv4 } from '@firebase/util';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photos: string[] = []

  constructor(private angularFireStorage: AngularFireStorage) { }

  getPhotos(room: string) {
    const ref = 'uploads/' + room + "/"
    const storageRef = this.angularFireStorage.ref(ref)
    storageRef.listAll().subscribe(data => {
      data.items.forEach(async e => {
        const a = await e.getDownloadURL().then(b => {
          this.photos.push(b)
        })
      })
    })
    return this.photos
  }

  async newPhoto(room: string) {
    let b = ""
    this.takePhoto().then(photo => {
      const reader = new FileReader();
      reader.onload = () => {
        const imgBlob = new Blob([reader.result], {
          type: `image/${photo.format}`,
        });
        const id = uuidv4();
        const ref = 'uploads/' + room + "/" + id + "/"
        this.angularFireStorage.upload(ref, imgBlob).then(async res => b = await res.ref.getDownloadURL())
      };
      fetch(photo.webPath).then((v) =>
        v.blob().then((imagen) => reader.readAsArrayBuffer(imagen))
      );
    });
    return b
  }

  async takePhoto() {
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }
}

export interface Photo {
  ok: boolean;
  path: string;
  prev?: string;
  err?: object;
}