import {IChauffeur} from './IChauffeur';
import {Vehicule} from './Vehicule';

export interface Affectation {
  id?: number;
  date: string;
  vehicule: Vehicule;
  chauffeur:IChauffeur;
}
