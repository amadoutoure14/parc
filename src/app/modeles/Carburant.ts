import {Vehicule} from './Vehicule';

export interface Carburant {
  id?: number;
  approv:number;
  date:string;
  vehicule:Vehicule;
}
