import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { LocationService } from '../../services/location.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../../../../shared/service/search.service';

@Component({
  selector: 'app-location-list',
  imports: [HttpClientModule],
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss',
  providers: [LocationService]

})
export class LocationListComponent {
  public locations: any[] = [];
  public nextPage: string = "";
  @ViewChild('locationList') locationList!: ElementRef;
  constructor(
    private service: LocationService,
    private searchService: SearchService
  ) { }
  ngOnInit(): void {
    this.getLocation();
    this.searchService.searchEvent.subscribe((x) => {
      this.locations = [];
      this.getLocation()
    })
  }

  getLocation(page: string = "") {
    this.service.getAll(page, this.searchService.searchValue)
      .subscribe((locationList) => {
        if (locationList) {
          this.locations.push(...locationList.results);
          this.nextPage = locationList.info.next.slice(locationList.info.next.indexOf("page="))
        }
      });
  }

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    // Captures / defines current window height when called
    const windowHeight = window.innerHeight;
    // Captures bounding rectangle of 5th element
    const boundingRectFive = this.locationList.nativeElement.getBoundingClientRect();
    // Captures bounding rectangle of 8th element
    if ((boundingRectFive.bottom - 400) <= windowHeight)
      this.getLocation(this.nextPage);
  }
}
