import {Chauffeur} from './Chauffeur';

export class PointageChauffeur{
  id?: number;
  date:Date;
  chauffeur:Chauffeur;
  constructor(id: number, date: Date, chauffeur: Chauffeur) {
    this.id = id;
    this.date = date;
    this.chauffeur = chauffeur;
  }
}
