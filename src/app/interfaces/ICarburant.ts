import {Vehicule} from '../modeles/Vehicule';

export interface ICarburant {
  id?: number;
  approv:number;
  date:string;
  vehicule:Vehicule;
}
