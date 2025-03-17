import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PointageChauffeurService {
private env = environment.apiUrl;
  constructor(private http: HttpClient) { }

  pointer(date: Date | null, id: number | null | undefined):Observable<any> {
    const url = `${this.env}/pointage/chauffeur/nouveau/${id}?date=${date}`;
    return this.http.post(url,{})
  }

  liste():Observable<any>  {
    const url = `${this.env}/pointage/chauffeur/liste`;
    return this.http.get(url)
  }

  listeDates(id: number | null | undefined, debut: Date, fin: Date):Observable<any>  {
    const url = `${this.env}/pointage/chauffeur/${id}/dates?debut=${debut}&fin=${fin}`;
    return this.http.get(url)
  }

  listeDate(id: number | undefined, dateUnique: Date | null):Observable<any> {
    const url = `${this.env}/pointage/chauffeur/${id}/date?date=${dateUnique}`;
    return this.http.get(url)
  }

  listePeriode(debut: Date, fin: Date) :Observable<any>{
    const url = `${this.env}/pointage/chauffeur/period?debut=${debut}&fin=${fin}`;
    return this.http.get(url)
  }


  chauffeur(id: number | undefined):Observable<any> {
    const url = `${this.env}/pointage/chauffeur/${id}`;
    return this.http.get(url)
  }
}
