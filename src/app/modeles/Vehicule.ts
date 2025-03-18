import {Carburant} from './Carburant';

export class Vehicule {
  id?: number | null;
  immatriculation: string;
  modele: string;
  commentaire: string;
  carburants?: Carburant[] | null;
  sortie?: boolean | null;
  chauffeur?: boolean | null;
  cocher?: boolean;
  date?:Date| null;


  constructor(id: number | null, immatriculation: string, modele: string, commentaire: string, carburants: Carburant[] | null, sortie: boolean | null, chauffeur: boolean | null, cocher: boolean, date: Date | null) {
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
    this.commentaire = commentaire;
    this.carburants = carburants;
    this.sortie = sortie;
    this.chauffeur = chauffeur;
    this.cocher = cocher;
    this.date = date;
  }
}
