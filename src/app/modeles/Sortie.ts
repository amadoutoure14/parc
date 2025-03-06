import {Affectation} from './Affectation';

export class Sortie{
  id?: number|null;
  affectation?: Affectation|null;
  objet:string;
  destination: string;
  date_fin: string;
  date_debut:string;
  date?:string|null;
  lieu_depart?:string|null;
  duree?: number|null;
  status?: boolean|null;

  constructor(id: number | null, affectation: Affectation | null, objet: string, destination: string, date_fin: string, date_debut: string, date: string | null, lieu_depart: string | null, duree: number | null, status: boolean | null) {
    this.id = id;
    this.affectation = affectation;
    this.objet = objet;
    this.destination = destination;
    this.date_fin = date_fin;
    this.date_debut = date_debut;
    this.date = date;
    this.lieu_depart = lieu_depart;
    this.duree = duree;
    this.status = status;
  }
}
