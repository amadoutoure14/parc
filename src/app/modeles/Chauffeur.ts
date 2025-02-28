export class Chauffeur {
  id?: number|null;
  nom_complet: string;
  permis: string;
  telephone: string;
  date: string|null;


  constructor(id: number | null, nom_complet: string, permis: string, telephone: string, date: string | null) {
    this.id = id;
    this.nom_complet = nom_complet;
    this.permis = permis;
    this.telephone = telephone;
    this.date = date;
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
