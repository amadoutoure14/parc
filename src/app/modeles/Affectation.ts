import { IAffectation } from '../interfaces/IAffectation';
import { Vehicule } from './Vehicule';
import { Chauffeur } from './Chauffeur';

export class Affectation implements IAffectation {
  chauffeur: Chauffeur | null;
  date: string;
  id: number;
  vehicule: Vehicule | null;

  constructor(chauffeur: Chauffeur | null, date: string, id: number, vehicule: Vehicule | null) {
    this.chauffeur = chauffeur;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }

  // Convertir l'objet en JSON
  toJson(): any {
    return {
      chauffeur: this.chauffeur ? this.chauffeur.toJson() : null,
      date: this.date,
      id: this.id,
      vehicule: this.vehicule ? this.vehicule.toJson() : null
    };
  }

  // Convertir un JSON en objet Affectation
  static fromJson(json: any): Affectation {
    return new Affectation(
      json.chauffeur ? Chauffeur.fromJson(json.chauffeur) : null,
      json.date,
      json.id,
      json.vehicule ? Vehicule.fromJson(json.vehicule) : null
    );
  }
}
