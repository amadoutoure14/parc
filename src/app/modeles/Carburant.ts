import { Vehicule } from './Vehicule';

export class Carburant  {
  approv: number;
  date?: string|null;
  id?: number|null;
  vehicule?: Vehicule | null;

  constructor(approv: number, date: string | null, id: number | null, vehicule: Vehicule | null) {
    this.approv = approv;
    this.date = date;
    this.id = id;
    this.vehicule = vehicule;
  }

  toJson(): any {
    return {
      approv: this.approv,
      date: this.date,
      id: this.id,
      vehiculeId: this.vehicule ? this.vehicule.id : null // Récupère uniquement l'ID du véhicule
    };
  }

}
