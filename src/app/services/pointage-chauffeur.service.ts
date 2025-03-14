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

  pointer(date: string | null, id: number | null | undefined):Observable<any> {
    const url = `${this.env}/pointage/chauffeur/nouveau/${id}?date=${date}`;
    return this.http.post(url,{})
  }

  liste():Observable<any>  {
    const url = `${this.env}/pointage/chauffeur/liste`;
    return this.http.get(url)
  }
}
