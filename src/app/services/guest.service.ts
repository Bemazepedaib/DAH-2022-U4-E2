import { Injectable } from '@angular/core';
import { Guest } from '../models/guest';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  private guests: Guest[];
  private activeGuest: Guest;
  private lang: string

  constructor() {
    this.guests = [{
      guestName: "Luis Saucedo",
      guestPhone: "3111923062",
      enterDate: new Date("2022/11/14"),
      leaveDate: new Date("2022/11/24"),
      roomCode: "101",
    }, {
      guestName: "Gustavo Lemus",
      guestPhone: "3112705037",
      enterDate: new Date("2022/11/25"),
      leaveDate: new Date("2022/11/27"),
      roomCode: "102"
    }]
    this.activeGuest = {
      guestName: "",
      guestPhone: "",
      enterDate: new Date(""),
      leaveDate: new Date(""),
      roomCode: ""
    }
    this.lang = "es"

  }

  public setLang(s: string){
    this.lang = s
  }

  public getLang(): string{
    return this.lang
  }

  public setActive(g:Guest){
    this.activeGuest = g
  }

  public getActive(): Guest {
    return this.activeGuest
  }

  public addGuest(g:Guest){
    this.guests.push(g)
  }

  public deleteGuest(pos: number): Guest[]{
    this.guests.splice(pos, 1)
    return this.guests
  }

  public getGuestByPhoneNumber(pn: string): Guest{
    let item: Guest;
    item = this.guests.find(
      (guest) => {
        return guest.guestPhone===pn
      }
    );
    return item
  }

  public getGuests(): Guest[]{
    return this.guests
  }
}
