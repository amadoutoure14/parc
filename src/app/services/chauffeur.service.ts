import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {Chauffeur} from '../modeles/Chauffeur';
import {Server} from './server';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
private env=environment.apiUrl;
  constructor(private http: HttpClient) { }


  ajouterChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    const postUrl = `http://localhost:8080/chauffeur/nouveau`
    return this.http.post<Chauffeur>(postUrl, chauffeur);
  }

  listeChauffeur():Observable<Chauffeur[]> {
    const listeUrl = `http://localhost:8080/chauffeur/liste`;
    return this.http.get<Chauffeur[]>(listeUrl);
  }

  filtreChauffeurDate(debut: Date,fin:Date ): Observable <any>{
    const presenceUrl=`${this.env}/chauffeur/dates/d?debut=${debut}&fin=${fin}`;
    return this.http.get<any>(presenceUrl);
  }

  imprimerChauffeurDate(debut: Date,fin: Date) : Observable<Blob>{
    const url = `${this.env}/chauffeur/dates/pdf/d?debut=${debut}&fin=${fin}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
