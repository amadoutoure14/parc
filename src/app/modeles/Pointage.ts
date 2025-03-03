import {Vehicule} from './Vehicule';

export class Pointage {
  id?: number;
  date:Date;
  vehicule:Vehicule;

  constructor(id: number, date: Date, vehicule: Vehicule) {
    this.id = id;
    this.date = date;
    this.vehicule = vehicule;
  }

  toJson(): any {
    return {
      id: this.id,
      date: this.date,
      vehicule: this.vehicule
    }
  }
}
