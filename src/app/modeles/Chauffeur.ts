import { IChauffeur } from '../interfaces/IChauffeur';

export class Chauffeur implements IChauffeur {
  id?: number;
  nom_complet: string;
  permis: string;
  telephone: string;
  date: string;

  constructor(date: string, nom_complet: string, permis: string, telephone: string, id?: number) {
    this.date = date;
    this.nom_complet = nom_complet;
    this.permis = permis;
    this.telephone = telephone;
    this.id = id;
  }

  // Convertir un JSON en objet Chauffeur
  static fromJson(chauffeurJson: Partial<IChauffeur>): Chauffeur {
    return new Chauffeur(
      chauffeurJson.date ?? '', // Valeur par défaut pour éviter les `undefined`
      chauffeurJson.nom_complet ?? 'Inconnu',
      chauffeurJson.permis ?? 'Non spécifié',
      chauffeurJson.telephone ?? 'Non spécifié',
      chauffeurJson.id
    );
  }

  // Convertir un objet Chauffeur en JSON
  toJson(): IChauffeur {
    return {
      id: this.id ?? undefined, // Assure que l'id peut être absent
      nom_complet: this.nom_complet,
      permis: this.permis,
      telephone: this.telephone,
      date: this.date
    };
  }
}
