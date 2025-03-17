export class Chauffeur {
  id?: number;
  nom_complet: string;
  permis: string;
  telephone: string;
  date: Date|null;
  cocher?: boolean;


  constructor(id: number, nom_complet: string, permis: string, telephone: string, date: Date | null) {
    this.id = id;
    this.nom_complet = nom_complet;
    this.permis = permis;
    this.telephone = telephone;
    this.date = date;
  }

}
