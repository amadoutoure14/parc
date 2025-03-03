import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';

export class Affectation {
  chauffeur: Chauffeur;
  nom: string;
  date?: string;
  id?: number|null;
  vehicule: Vehicule;


  constructor(chauffeur: Chauffeur, nom: string, date: string, id: number | null, vehicule: Vehicule) {
    this.chauffeur = chauffeur;
    this.nom = nom;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }

  toJson(): any {
    return {
      chauffeur: this.chauffeur,
      nom: this.nom,
      id: this.id,
      vehicule: this.vehicule
    };
  }
}
