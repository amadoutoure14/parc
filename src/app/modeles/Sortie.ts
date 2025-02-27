import {Affectation} from './Affectation';

export class Sortie{
  id?: number|null;
  affectation?: Affectation|null;
  objet:string;
  destination: string;
  arrivee: string;
  depart:string;
  date?:string|null;
  lieu_depart?:string|null;

  constructor(id: number | null, affectation: Affectation|null, objet: string, destination: string, arrivee: string, depart: string, date: string | null,lieu_depart: string | null) {
    this.id = id;
    this.affectation = affectation;
    this.objet = objet;
    this.destination = destination;
    this.arrivee = arrivee;
    this.depart = depart;
    this.date = date;
    this.lieu_depart = lieu_depart;
  }

  toJson(): any {
    return {
      affectation: this.affectation,
      objet: this.objet,
      destination: this.destination,
      arrivee: this.arrivee,
      depart: this.depart,
      lieu_depart:this.lieu_depart
    }
  }

}
