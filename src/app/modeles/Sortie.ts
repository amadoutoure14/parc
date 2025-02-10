import { Affectation } from './Affectation';

export class Sortie {
  affectation: Affectation;
  arrivee?: string | null;
  depart?: string| null;
  destination: string;
  duree?: number| null;
  id?: string| null;
  objet: string;


  constructor(affectation: Affectation, arrivee: string | null, depart: string | null, destination: string, duree: number | null, id: string | null, objet: string) {
    this.affectation = affectation;
    this.arrivee = arrivee;
    this.depart = depart;
    this.destination = destination;
    this.duree = duree;
    this.id = id;
    this.objet = objet;
  }

// Convertir l'objet en JSON
  toJson(): any {
    return {
      affectation: this.affectation.toJson(),
      dateArrivee: this.arrivee,
      dateDepart: this.depart,
      destination: this.destination,
      duree: this.duree,
      id: this.id,
      objet: this.objet
    };
  }

  // Convertir un JSON en objet Sortie
  static fromJson(json: any): Sortie {
    return new Sortie(
      Affectation.fromJson(json.affectation),
      json.dateArrivee,
      json.dateDepart,
      json.destination,
      json.duree,
      json.id,
      json.objet
    );
  }
}
