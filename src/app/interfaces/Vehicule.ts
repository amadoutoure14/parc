import {Carburant} from './Carburant';

export interface Vehicule {
  id?:number;
  immatriculation:string;
  disponible:boolean;
  modele:string;
  date:string;
  commentaire:string;
  carburants:Carburant[];

}
