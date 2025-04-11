import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageVehiculeService {
  private env=environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  pointer(date: Date | null | undefined, id: number | null | undefined): Observable<any> {
    const url = `${this.env}/pointage/nouveau/${id}?date=${date}`;
    return this.http.post(url, {});
  }

  liste(): Observable<any> {
    const url = `${this.env}/pointage/liste`;
    return this.http.get(url);
  }

  listeDates(vehicule: number | null | undefined, debut: Date, fin: Date): Observable<any> {
    const url = `${this.env}/pointage/carburant/${vehicule}?debut=${debut}&fin=${fin}`;
    return this.http.get(url)
  }

  listeDate(vehicule: number | null | undefined, date: Date | null): Observable<any>{
    const url = `${this.env}/pointage/${vehicule}/date?date=${date}`;
    return this.http.get(url)
  }

  listePeriode(debut: Date, fin: Date): Observable<any> {
    const url = `${this.env}/pointage/period?debut=${debut}&fin=${fin}`;
    return this.http.get(url)
  }

  vehicule(vehicule: number | null | undefined): Observable<any> {
    const url = `${this.env}/pointage/vehicule/index/${vehicule}`;
    return this.http.get(url)
  }

  supprimer(id: number): Observable<any> {
    const url = `${this.env}/pointage/supprimer/${id}`;
    return this.http.delete(url)
  }
}
