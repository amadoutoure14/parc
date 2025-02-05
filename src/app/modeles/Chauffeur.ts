import {IChauffeur} from '../interfaces/IChauffeur';

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

  static fromJson(chauffeurJson: IChauffeur): Chauffeur {
    return new Chauffeur(
      chauffeurJson.date,
      chauffeurJson.nom_complet,
      chauffeurJson.permis,
      chauffeurJson.telephone,
      chauffeurJson.id
    );
  }

  toJson(): IChauffeur {
    return {
      id: this.id,
      nom_complet: this.nom_complet,
      permis: this.permis,
      telephone: this.telephone,
      date: this.date
    };
  }
}
