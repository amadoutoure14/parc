import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Injectable } from '@angular/core';
import {Chauffeur} from '../modeles/Chauffeur';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
private env=environment.apiUrl;
  constructor(private http: HttpClient) { }


  ajouterChauffeur(chauffeur: Chauffeur): Observable<Chauffeur> {
    const postUrl = `${this.env}/chauffeur/nouveau`
    return this.http.post<Chauffeur>(postUrl, chauffeur);
  }

  listeChauffeur():Observable<any> {
    const listeUrl = `${this.env}/chauffeur/liste`;
    return this.http.get<any>(listeUrl);
  }

  filtreChauffeurDate(debut: Date,fin:Date ): Observable <any>{
    const presenceUrl=`${this.env}/chauffeur/dates/d?debut=${debut}&fin=${fin}`;
    return this.http.get<any>(presenceUrl);
  }


  patch(chauffeur: Chauffeur): Observable<any> {
    const url = `${this.env}/chauffeur/${chauffeur.id}/maj`;
    return this.http.patch(url, {
      nom_complet: chauffeur.nom_complet,
      permis: chauffeur.permis,
      telephone: chauffeur.telephone
    });
  }

  supprimer(chauffeur: Chauffeur): Observable<any> {
    const presenceUrl=`${this.env}`;
    return this.http.get<any>(presenceUrl);
  }
}
