import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';


const API_USERS_URL = `https://rickandmortyapi.com/api/character`;


@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private http: HttpClient) { }
  getAll(page: string, searchTerm: string): Observable<any> {
    return this.http.get<any[]>(`${API_USERS_URL}?${page}&name=${searchTerm}`);
  }
  getDetails(id: number): Observable<any> {
    return this.http.get<any[]>(`${API_USERS_URL}/${id}`);
  }
}