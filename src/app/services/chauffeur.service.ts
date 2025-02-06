import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {Chauffeur} from '../modeles/Chauffeur';
import {IChauffeur} from '../interfaces/IChauffeur';
@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  constructor(private http: HttpClient) {}

  ajouterChauffeur(chauffeur: Chauffeur): Observable<any> {
    const postUrl = 'http://localhost:8080/chauffeur/nouveau';
    return this.http.post<any>(postUrl, chauffeur.toJson());
  }

  listeChauffeur(): Observable<Chauffeur[]> {
    const ListeUrl = 'http://localhost:8080/chauffeur/liste';
    return this.http.get<IChauffeur[]>(ListeUrl).pipe(
      map(chauffeursJson => chauffeursJson.map(chauffeurJson => Chauffeur.fromJson(chauffeurJson)))
    );
  }


}

