export class Chauffeur {
  id?: number;
  nom_complet: string;
  telephone: string;
  date: Date|null;
  cocher?: boolean;


  constructor(id: number, nom_complet: string,  telephone: string, date: Date | null) {
    this.id = id;
    this.nom_complet = nom_complet;
    this.telephone = telephone;
    this.date = date;
  }

}
