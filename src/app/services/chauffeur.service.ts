import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {Chauffeur} from '../modeles/Chauffeur';
import {PresenceChauffeur} from '../modeles/presenceChauffeur';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  private baseUrl = 'http://localhost:8080/chauffeur';

  constructor(private http: HttpClient) {}

  ajouterChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    const postUrl = `${this.baseUrl}/nouveau`;
    return this.http.post<Chauffeur>(postUrl, chauffeur);
  }

  listeChauffeur(): Observable<Chauffeur[]> {
    const listeUrl = `${this.baseUrl}/liste`;
    return this.http.get<Chauffeur[]>(listeUrl);
  }

  filtreChauffeurDate(formatted: string|null) : Observable <Chauffeur[]>{
    const presenceUrl=` http://localhost:8080/chauffeur/index/date/liste/d?date=${formatted}`;
    return this.http.get<Chauffeur[]>(presenceUrl);
  }

  imprimerPresenceChauffeur(date: string|null) : Observable<Blob>{
    const url = `http://localhost:8080/chauffeur/index/date/liste/pdf/d?date=${date}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
