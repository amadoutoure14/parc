import { ISortie } from '../interfaces/ISortie';
import { Affectation } from './Affectation';

export class Sortie implements ISortie {
  affectation: Affectation | null;
  dateArrivee: string;
  dateDepart: string;
  destination: string;
  duree: number;
  id: string;
  objet: string;

  constructor(
    affectation: Affectation | null,
    dateArrivee: string,
    dateDepart: string,
    destination: string,
    duree: number,
    id: string,
    objet: string
  ) {
    this.affectation = affectation;
    this.dateArrivee = dateArrivee;
    this.dateDepart = dateDepart;
    this.destination = destination;
    this.duree = duree;
    this.id = id;
    this.objet = objet;
  }

  // Convertir l'objet en JSON
  toJson(): any {
    return {
      affectation: this.affectation ? this.affectation.toJson() : null,
      dateArrivee: this.dateArrivee,
      dateDepart: this.dateDepart,
      destination: this.destination,
      duree: this.duree,
      id: this.id,
      objet: this.objet
    };
  }

  // Convertir un JSON en objet Sortie
  static fromJson(json: any): Sortie {
    return new Sortie(
      json.affectation ? Affectation.fromJson(json.affectation) : null,
      json.dateArrivee,
      json.dateDepart,
      json.destination,
      json.duree,
      json.id,
      json.objet
    );
  }
}
