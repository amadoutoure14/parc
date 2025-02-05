import {ICarburant} from '../interfaces/ICarburant';
import {Vehicule} from './Vehicule';

export class Carburant implements ICarburant {
  approv: number;
  date: string;
  id: number;
  vehicule: Vehicule;


  constructor(approv: number, date: string, id: number, vehicule: Vehicule) {
    this.approv = approv;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}
