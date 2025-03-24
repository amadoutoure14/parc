import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';
import {Sortie} from './Sortie';

export class Affectation {
  chauffeur: Chauffeur | null;
  date: Date | null;
  id?: number | null;
  vehicule: Vehicule | null;
  derniereSortie?: Sortie | null;

  constructor(chauffeur: Chauffeur | null, date: Date | null, id: number | null, vehicule: Vehicule | null) {
    this.chauffeur = chauffeur;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}

