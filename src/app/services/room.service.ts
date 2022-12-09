import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private rooms: Room[];

  constructor(private firestore: AngularFirestore) {
    this.getRooms().subscribe(res => {
      this.rooms = res
    })
  }

  public getRooms(): Observable<Room[]>{
    return this.firestore.collection('room').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Room
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public getRoom(id: string){
    return this.firestore.collection('room').doc(id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Room
        const id = a.payload.id;
        return { id, ...data };
      })
    )
  }

  public changeStatus(r: Room): Observable<Room[]>{
    let a = {
      enterCode: Math.floor(Math.random()*90000) + 10000,
      roomCode: r.roomCode,
      price: r.price,
      status: !r.status
    }
    return this.updateRoom(r.id, a)
  }

  public updateRoom(id: string, r: Room): Observable<Room[]>{
    this.firestore.doc('room/'+ id).update(r);
    return this.getRooms();
  }

  public getRoomByCode(code: string): Room {
    let item = this.rooms.find(
      (room) => {
        return room.roomCode === code;
      }
    );
    return item;
  }
  
}