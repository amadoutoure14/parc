import { Injectable } from '@angular/core';
import {Carburant} from '../modeles/Carburant';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Vehicule} from '../modeles/Vehicule';

@Injectable({
  providedIn: 'root'
})
export class CarburantService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  approvisionner(carburant: Carburant): Observable<any> {
    const url = `${this.apiUrl}/approv/nouveau`;
    const body = {
      approv: carburant.approv,
      date: carburant.date,
      vehicule: carburant.vehicule
    };
    return this.http.post<Carburant>(url, body);
  }



  listeApprov(): Observable<any> {
    const url = `${this.apiUrl}/approv/liste`;
    return this.http.get<any>(url)
  }
  total(): Observable<any> {
    const url = `${this.apiUrl}/approv/total`;
    return this.http.get<any>(url)
  }

  carburantVehicule(vehicule: Vehicule): Observable<any> {
    const url = `${this.apiUrl}/approv/vehicule?id=${vehicule.id}`;
    return this.http.get<Carburant>(url);
  }

  imprimer(vehicule: Vehicule): Observable<Blob> {
    const url = `${this.apiUrl}/approv/imprimer?id=${vehicule.id}`;
    return this.http.get(url, { responseType: 'blob' });
  }

  patch(carburant: Carburant): Observable<any>  {
    const url = `${this.apiUrl}/approv/${carburant.id}/maj?approv=${carburant.approv}`;
    return this.http.patch<Carburant>(url, carburant);
  }

  vehiculeDates(vehicule: Vehicule, debut: Date, fin: Date):Observable<any> {
   const url = `${this.apiUrl}/approv/vehicule/${vehicule.id}/period/total?debut=${debut}&fin=${fin}`
    return this.http.get(url)
  }

  vehicule(id: number | null | undefined):Observable<any> {
    const url=`${this.apiUrl}/approv/vehicule?id=${id}`;
    return this.http.get(url)
  }

  supprimer(carburant: Carburant):Observable<any> {
    const url=`${this.apiUrl}/approv/${carburant.id}/sup`;
    return this.http.delete(url);
  }
}
