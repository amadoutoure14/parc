import {IVehicule} from './IVehicule';

export interface Carburant {
  id?: number;
  approv:number;
  date:string;
  vehicule:IVehicule;
}
