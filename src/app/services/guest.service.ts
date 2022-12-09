import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[];
  private activeGuest: Guest;
  private lang: string

  constructor(private firestore: AngularFirestore) {
    this.getGuests().subscribe(res => {
      this.guests = res
    })
    this.activeGuest = {
      guestName: "",
      guestPhone: "",
      enterDate: new Date(""),
      leaveDate: new Date(""),
      roomCode: "",
      payment: 0,
      roomPrice: "",
      enterCode: ""
    }
    this.lang = "es"
  }

  public getGuests(): Observable<Guest[]>{
    return this.firestore.collection('guest').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Guest
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getGuest(id: string){
    return this.firestore.collection('guest').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Guest
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }

  public setLang(s: string) {
    this.lang = s
  }

  public getLang(): string {
    return this.lang
  }

  public setActive(g: Guest) {
    this.activeGuest = g
  }

  public getActive(): Guest {
    return this.activeGuest
  }

  public newGuest(g: Guest): Observable<Guest[]> {
    this.firestore.collection('guest').add(g);
    return this.getGuests();
  }

  public removeGuest(id: string): Observable<Guest[]> {
    this.firestore.doc('guest/'+id).delete();
    return this.getGuests();
  }

  public getGuestByPhoneNumber(pn: string): Guest {
    let item: Guest;
    item = this.guests.find(
      (guest) => {
        return guest.guestPhone === pn
      }
    );
    return item
  }
}
