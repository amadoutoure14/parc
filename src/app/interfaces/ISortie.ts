import {Affectation} from '../modeles/Affectation';

export interface ISortie {
  affectation: Affectation | null;
  dateArrivee: string;
  dateDepart: string;
  destination: string;
  duree: number;
  id: string;
  objet: string;
}
