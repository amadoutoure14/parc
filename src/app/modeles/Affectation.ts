import { Vehicule } from './Vehicule';
import { Chauffeur } from './Chauffeur';

export class Affectation {
  chauffeur: Chauffeur;
  nom: string;
  date?: string;
  id?: number;
  vehicule: Vehicule;

  constructor(chauffeur: Chauffeur, nom: string, id?: number, vehicule?: Vehicule, date?: string) {
    this.chauffeur = chauffeur;
    this.nom = nom;
    this.id = id;
    this.vehicule = vehicule!;
    this.date = date;
  }

  toJson(): any {
    return {
      chauffeur: this.chauffeur,
      nom: this.nom,
      id: this.id,
      vehicule: this.vehicule
    };
  }


  // Convertir un JSON en objet Affectation
  static fromJson(json: any): Affectation {
    return new Affectation(
      Chauffeur.fromJson(json.chauffeur),
      json.nom,
      json.id,
      Vehicule.fromJson(json.vehicule),
      json.date ?? undefined
    );
  }
}
