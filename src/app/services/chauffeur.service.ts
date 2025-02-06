import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChauffeurService {
  private apiUrl = 'http://localhost:8080/chauffeur/nouveau';

  constructor(private http: HttpClient) {}

  ajouterChauffeur(chauffeur: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, chauffeur);
  }

}

