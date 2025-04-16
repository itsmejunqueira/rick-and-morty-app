import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LocationService } from '../../services/location.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-location-details',
  imports: [HttpClientModule, AsyncPipe],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.scss',
  providers: [LocationService]
})

export class LocationDetailsComponent implements OnInit {
  public location$: Observable<any>;
  public nextPage: string = "";
  @ViewChild('locationDetails') locationDetails!: ElementRef;
  private readonly route = inject(ActivatedRoute);
  selectedId: number = 0;
  constructor(
    private service: LocationService
  ) { }
  
  ngOnInit(): void {
    this.location$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
        return this.service.getDetails(this.selectedId);
      })
    );
  }

  getCharacterPath(character: any) {
    let pathSplit = character.split("/");
    return '/character-details/' + pathSplit[pathSplit.length - 1]
  }
}