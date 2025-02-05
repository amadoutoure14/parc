import {IChauffeur} from './IChauffeur';
import {IVehicule} from './IVehicule';

export interface Affectation {
  id?: number;
  date: string;
  vehicule: IVehicule;
  chauffeur:IChauffeur;
}
