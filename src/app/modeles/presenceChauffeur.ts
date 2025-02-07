import { Chauffeur } from './Chauffeur';

export class PresenceChauffeur {
  id: number;
  date: string;
  chauffeur: Chauffeur;

  constructor(id: number, date: string, chauffeur: Chauffeur) {
    this.id = id;
    this.date = date;
    this.chauffeur = chauffeur;
  }

  // Méthode pour convertir un JSON en objet PresenceChauffeur
  static fromJson(presenceChauffeurJson: Partial<PresenceChauffeur>): PresenceChauffeur {
    return new PresenceChauffeur(
      presenceChauffeurJson.id ?? 0,
      presenceChauffeurJson.date ?? '',
      Chauffeur.fromJson(presenceChauffeurJson.chauffeur ?? {})
    );
  }

  toJson(): { id: number; date: string; chauffeur: any } {
    return {
      id: this.id,
      date: this.date,
      chauffeur: this.chauffeur.toJson(), // Conversion du chauffeur en JSON
    };
  }
}
