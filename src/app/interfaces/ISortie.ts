import {Affectation} from '../modeles/Affectation';

export interface ISortie{
  id?: string;
  dateDepart:string;
  dateArrivee:string;
  affectation:Affectation;
  objet:string;
  duree:number;
  destination:string;
}
