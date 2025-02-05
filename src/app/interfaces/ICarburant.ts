import {Vehicule} from '../modeles/Vehicule';
export interface ICarburant {
  approv: number;
  date: string;
  id: number;
  vehicule: Vehicule | null; // Autoriser null
}
