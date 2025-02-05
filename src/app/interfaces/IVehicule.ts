import {Carburant} from '../modeles/Carburant';

export interface IVehicule {
  id?:number;
  immatriculation:string;
  disponible:boolean;
  modele:string;
  date:string;
  commentaire:string;
  carburants:Carburant[];

}
