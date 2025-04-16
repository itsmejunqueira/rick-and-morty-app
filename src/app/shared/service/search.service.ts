import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  searchEvent =  new EventEmitter<string>();
  searchValue = "";
  constructor() {
    this.searchEvent.subscribe(search => this.searchValue = search);
  } 

  getSearch(){
    return this.searchValue;
  }
}