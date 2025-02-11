import { Vehicule } from './Vehicule';

export class Carburant  {
  approv: number;
  date?: string|null;
  id?: number|null;
  vehicule: Vehicule | null;

  constructor(approv: number, date: string | null, id: number | null, vehicule: Vehicule | null) {
    this.approv = approv;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }

  // Convertir l'objet en JSON
  toJson(): any {
    return {
      approv: this.approv,
      date: this.date,
      id: this.id,
      vehicule: this.vehicule
    };
  }

  // Convertir un JSON en objet Carburant
  static fromJson(json: any): Carburant {
    return new Carburant(json.approv, json.date, json.id, Vehicule.fromJson(json.vehicule));
  }
}
