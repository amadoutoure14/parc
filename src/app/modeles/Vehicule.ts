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
  duree_location?: number | null;
  debut_location?: string ;
  fin_location?: string ;
  parc?: boolean | null;

  constructor(id: number | null, immatriculation: string, modele: string, commentaire: string, date: string | null, carburants: Carburant[] | null, sortie: boolean | null, chauffeur: boolean | null, duree_location: number | null, debut_location: string, fin_location: string, parc: boolean | null) {
    this.id = id;
    this.immatriculation = immatriculation;
    this.modele = modele;
    this.commentaire = commentaire;
    this.date = date;
    this.carburants = carburants;
    this.sortie = sortie;
    this.chauffeur = chauffeur;
    this.duree_location = duree_location;
    this.debut_location = debut_location;
    this.fin_location = fin_location;
    this.parc = parc;
  }
}
