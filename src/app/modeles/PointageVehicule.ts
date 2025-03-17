import {Vehicule} from './Vehicule';

export class PointageVehicule {
  id?: number;
  date:Date;
  vehicule:Vehicule;

  constructor(id: number, date: Date, vehicule: Vehicule) {
    this.id = id;
    this.date = date;
    this.vehicule = vehicule;
  }
}
