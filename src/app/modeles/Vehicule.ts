import {Carburant} from './Carburant';

export class Vehicule {
  id?: number | null;
  immatriculation: string;
  modele: string;
  commentaire: string;
  date?: string | null;
  carburants?: Carburant[] | null;
  sortie?: boolean | null;
  chauffeur?: boolean | null;
  duree_location?: number | null;
  debut_location?: string ;
  fin_location?: string ;

  constructor(
    id?: number | null,
    immatriculation: string = '',
    modele: string = '',
    commentaire: string = '',
    date?: string | null,
    carburants?: Carburant[] | null,
    sortie?: boolean | null,
    chauffeur?: boolean | null,
    duree_location?: number | null,
    debut_location?: string ,
    fin_location?: string ,
  ) {
    this.id = id ?? null;
    this.immatriculation = immatriculation;
    this.modele = modele;
    this.commentaire = commentaire;
    this.date = date ?? null;
    this.carburants = carburants ?? null;
    this.sortie = sortie ?? null;
    this.chauffeur = chauffeur ?? null;
    this.duree_location = duree_location ?? null;
    this.debut_location = debut_location ;
    this.fin_location = fin_location ;
  }

  toJson(): any {
    return {
      immatriculation: this.immatriculation,
      modele: this.modele,
      commentaire: this.commentaire,
      debut_location: this.debut_location,
      fin_location: this.fin_location
    };
  }
}
