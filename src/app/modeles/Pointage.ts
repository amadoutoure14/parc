import {Vehicule} from './Vehicule';

export class Pointage {
  id?: number;
  date:Date;
  datePointage:Date;
  vehicule:Vehicule;

  constructor(id: number, date: Date, datePointage: Date, vehicule: Vehicule) {
    this.id = id;
    this.date = date;
    this.datePointage = datePointage;
    this.vehicule = vehicule;
  }
}
