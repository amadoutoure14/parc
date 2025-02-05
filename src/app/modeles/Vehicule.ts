import {IVehicule} from '../interfaces/IVehicule';
import {Carburant} from '../interfaces/Carburant';

export class Vehicule implements IVehicule{
  carburants: Carburant[];
  commentaire: string;
  date: string;
  disponible: boolean;
  id: number;
  immatriculation: string;
  modele: string;


  constructor(carburants: Carburant[], commentaire: string, date: string, disponible: boolean, id: number, immatriculation: string, modele: string) {
    this.carburants = carburants;
    this.commentaire = commentaire;
    this.date = date;
    this.disponible = disponible;
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
  }
}
