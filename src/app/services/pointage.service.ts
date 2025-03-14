import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Vehicule} from '../modeles/Vehicule';

@Injectable({
  providedIn: 'root'
})
export class PointageService {
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
    const url = `${this.env}/pointage/${vehicule}/dates?debut=${debut}&fin=${fin}`;
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
    const url = `${this.env}/pointage/vehicule/${vehicule}`;
    return this.http.get(url)
  }
}
