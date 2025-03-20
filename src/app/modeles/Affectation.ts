import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';

export class Affectation {
  chauffeur: Chauffeur | null;
  date: Date | null;
  id?: number | null;
  vehicule: Vehicule | null;

  constructor(chauffeur: Chauffeur | null, date: Date | null, id: number | null, vehicule: Vehicule | null) {
    this.chauffeur = chauffeur;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}

