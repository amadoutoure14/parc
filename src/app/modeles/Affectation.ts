import {IAffectation} from '../interfaces/IAffectation';
import {Vehicule} from './Vehicule';
import {Chauffeur} from './Chauffeur';

export class Affectation implements IAffectation {
  chauffeur: Chauffeur;
  date: string;
  id: number;
  vehicule: Vehicule;

  constructor(chauffeur: Chauffeur, date: string, id: number, vehicule: Vehicule) {
    this.chauffeur = chauffeur;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }
}
