import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';

export class Affectation {
  chauffeur: Chauffeur;
  nom: string;
  date?: string;
  id?: number;
  vehicule: Vehicule;

  constructor(chauffeur: Chauffeur, nom: string, id?: number, vehicule?: Vehicule, date?: string) {
    this.chauffeur = chauffeur;
    this.nom = nom;
    this.id = id;
    this.vehicule = vehicule!;
    this.date = date;
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
