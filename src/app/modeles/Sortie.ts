import {Affectation} from './Affectation';

export class Sortie{
  id?: number|null;
  affectation?: Affectation|null;
  objet:string;
  destination: string;
  arrivee: string;
  depart:string;
  date?:string|null;


  constructor(id: number | null, affectation: Affectation|null, objet: string, destination: string, arrivee: string, depart: string, date: string | null) {
    this.id = id;
    this.affectation = affectation;
    this.objet = objet;
    this.destination = destination;
    this.arrivee = arrivee;
    this.depart = depart;
    this.date = date;
  }

  toJson(): any {
    return {
      id: this.id,
      affectation: this.affectation,
      objet: this.objet,
      destination: this.destination,
      arrivee: this.arrivee,
      depart: this.depart,
      date:this.date
    }
  }
  static fromJson(json: any): Sortie {
    return new Sortie(
      json.id,
      json.affectation,
      json.objet,
      json.destination,
      json.arrivee,
      json.depart,
      json.date
    )
  }
}
