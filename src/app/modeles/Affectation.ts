import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';

export class Affectation {
  chauffeur?: Chauffeur | null;
  nom_affectation?: string | null;
  date?: string | null;
  id?: number | null;
  vehicule?: Vehicule | null;


  constructor(
    chauffeur: Chauffeur | null = null,
    nom_affectation: string | null = null,
    date: string | null = null,
    id: number | null = null,
    vehicule: Vehicule | null = null
  ) {
    this.chauffeur = chauffeur;
    this.nom_affectation = nom_affectation;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}

