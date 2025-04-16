import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subject } from 'rxjs';
import { SearchService } from '../../service/search.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterViewInit {
  private searchText$ = new Subject<string>();

  constructor(
    private service: SearchService
  ) { }

  ngAfterViewInit(): void {
    this.searchText$.pipe(
      debounceTime(1000)
    )
      .subscribe(x => this.service.searchEvent.emit(x));
  }

  search(event: Event) {
    this.searchText$.next((event.target as HTMLInputElement).value);
  }
}
