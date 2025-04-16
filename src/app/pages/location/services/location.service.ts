import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

const API_USERS_URL = `https://rickandmortyapi.com/api/location`;


@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) { }

  getAll(page: string, searchTerm: string): Observable<any> {
    return this.http.get<any[]>(`${API_USERS_URL}?${page}&name=${searchTerm}`);
  }

  getDetails(id: number): Observable<any> {
    return this.http.get<any[]>(`${API_USERS_URL}/${id}`);
  }
}