import { Vehicule } from './Vehicule';

export class Carburant  {
  approv: number;
  date: Date|null;
  id?: number|null;
  vehicule: Vehicule;


  constructor(approv: number, date: Date, id: number | null, vehicule: Vehicule) {
    this.approv = approv;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}
