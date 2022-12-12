import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { uuidv4 } from '@firebase/util';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photos: string[]

  constructor(private angularFireStorage: AngularFireStorage) { 

  }

  getPhotos(room: string): Observable<string[]>{
    const ref = 'uploads/'+room
    return this.angularFireStorage.ref(ref).getDownloadURL();
  }

  async takePhoto() {
    return await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
  }

  uploadPhoto(image: Blob, room: String) {
    const id = uuidv4();
    const ref = 'uploads/'+room+"/"+id+"/"
    this.angularFireStorage.upload(ref, image).then(res => console.log(res))
  }
}

export interface Photo {
  ok: boolean;
  path: string;
  prev?: string;
  err?: object;
}