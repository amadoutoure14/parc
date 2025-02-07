export class Chauffeur {
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
  static fromJson(chauffeurJson: Partial<Chauffeur>): Chauffeur {
    return new Chauffeur(
      chauffeurJson.date ?? '',
      chauffeurJson.nom_complet ?? 'Inconnu',
      chauffeurJson.permis ?? 'Non spécifié',
      chauffeurJson.telephone ?? 'Non spécifié',
      chauffeurJson.id
    );
  }

  toJson(): any {
    return {
      id: this.id ?? undefined,
      nom_complet: this.nom_complet,
      permis: this.permis,
      telephone: this.telephone,
      date: this.date
    };
  }
}
