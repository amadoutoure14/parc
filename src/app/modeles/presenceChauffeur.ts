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


  toJson(): { id: number; date: string; chauffeur: any } {
    return {
      id: this.id,
      date: this.date,
      chauffeur: this.chauffeur
    };
  }
}
