import { Vehicule } from './Vehicule';

export class Carburant  {
  approv: number;
  date: string;
  id: number;
  vehicule: Vehicule | null;

  constructor(approv: number, date: string, id: number, vehicule: Vehicule | null) {
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
      vehicule: this.vehicule ? this.vehicule.toJson() : null
    };
  }

  // Convertir un JSON en objet Carburant
  static fromJson(json: any): Carburant {
    return new Carburant(
      json.approv,
      json.date,
      json.id,
      json.vehicule ? Vehicule.fromJson(json.vehicule) : null
    );
  }
}
