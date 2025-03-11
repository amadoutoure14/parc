import {Carburant} from './Carburant';

export class Vehicule {
  id?: number | null;
  immatriculation: string;
  modele: string;
  commentaire: string;
  date: string | null;
  carburants?: Carburant[] | null;
  sortie?: boolean | null;
  chauffeur?: boolean | null;
  cocher?: boolean;


  constructor(id: number | null, immatriculation: string, modele: string, commentaire: string, date: string | null, carburants: Carburant[] | null, sortie: boolean | null, chauffeur: boolean | null, cocher: boolean) {
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
    this.commentaire = commentaire;
    this.date = date;
    this.carburants = carburants;
    this.sortie = sortie;
    this.chauffeur = chauffeur;
    this.cocher = cocher;
  }
}
