import {Chauffeur} from './Chauffeur';
import {Vehicule} from './Vehicule';

export interface Affectation {
  id?: number;
  date: string;
  vehicule: Vehicule;
  chauffeur:Chauffeur;
}
