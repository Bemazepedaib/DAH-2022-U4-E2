import { Injectable } from '@angular/core';
import { Room } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private ocuppied: Room[];
  private free: Room[];

  constructor() {
    this.ocuppied = [{
      enterCode: Math.floor(Math.random()*90000) + 10000,
      roomCode: "101",
      price: 1500
    }, {
      enterCode: Math.floor(Math.random()*90000) + 10000,
      roomCode: "102",
      price: 2000
    }]
    this.free = [{
      enterCode: Math.floor(Math.random()*90000) + 10000,
      roomCode: "103",
      price: 2500
    }]
  }

  public getOccupied(): Room[] {
    return this.ocuppied
  }

  public getFree(): Room[] {
    return this.free
  }

  public setOcuppied(r: Room) {
    this.free.splice(this.getIndexFreeRoomByCode(r.roomCode), 1)
    this.ocuppied.push(r);
  }

  public setFree(r: Room) {
    this.ocuppied.splice(this.getIndexOccupiedRoomByCode(r.roomCode), 1)
    this.free.push(r);
  }

  public getIndexOccupiedRoomByCode(code: string): number {
    let index = this.ocuppied.findIndex(
      (room) => {
        return room.roomCode===code;
      }
    );
    return index
  }

  public getIndexFreeRoomByCode(code: string): number {
    let index = this.free.findIndex(
      (room) => {
        return room.roomCode===code;
      }
    );
    return index;
  }

  public getOccupiedRoomByCode(code: string): Room{
    let item = this.ocuppied.find(
      (room) => {
        return room.roomCode===code;
      }
    );
    return item;
  }

  public getFreeRoomByCode(code: string): Room{
    let item = this.free.find(
      (room) => {
        return room.roomCode===code;
      }
    );
    return item;
  }
}
