import {Vehicule} from '../modeles/Vehicule';
import {Chauffeur} from '../modeles/Chauffeur';

export interface IAffectation {
  id?: number;
  date: string;
  vehicule: Vehicule| null;
  chauffeur:Chauffeur| null;
}
