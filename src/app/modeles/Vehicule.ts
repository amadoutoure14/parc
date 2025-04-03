import {Carburant} from './Carburant';

export class Vehicule {
  id?: number | null;
  immatriculation: string;
  modele: string;
  commentaire: string;
  carburants?: Carburant[] | null;
  sortie?: boolean | null;
  carburant?:number;
  cocher?: boolean;
  date?:Date| null|undefined;

  constructor(id: number | null, immatriculation: string, modele: string, commentaire: string, carburants: Carburant[] | null, sortie: boolean | null, carburant: number, cocher: boolean, date: Date | null) {
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
    this.commentaire = commentaire;
    this.carburants = carburants;
    this.sortie = sortie;
    this.carburant = carburant;
    this.cocher = cocher;
    this.date = date;
  }
}
