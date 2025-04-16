import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CharacterService } from '../../services/character.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-character-details',
  imports: [HttpClientModule, AsyncPipe, RouterLink ],
  templateUrl: './character-details.component.html',
  styleUrl: './character-details.component.scss',
  providers:[CharacterService]
})

export class CharacterDetailsComponent implements OnInit {
  public character$: Observable<any>;
  public nextPage: string =  "";
  @ViewChild('characterDetails') characterDetails!: ElementRef;
  private readonly route = inject(ActivatedRoute);
  selectedId: number = 0;
  constructor(
    private service: CharacterService
  ){}
  ngOnInit(): void {
    this.character$ = this.route.paramMap.pipe(
      switchMap(params => {
        this.selectedId = Number(params.get('id'));
       return this.service.getDetails(this.selectedId);
      })
    );
  }

  getLocationPath(location: any) {
    let pathSplit = location.url.split("/");
    return '/location-details/' + pathSplit[pathSplit.length - 1]
  }

  getEpisodePath(episode: any) {
    let pathSplit = episode.split("/");
    return '/episode-details/' + pathSplit[pathSplit.length - 1]
  }
}