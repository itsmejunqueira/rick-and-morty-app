import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { EpisodeService } from '../../services/episode.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-episode-details',
  imports: [HttpClientModule, AsyncPipe, RouterLink],
  templateUrl: './episode-details.component.html',
  styleUrl: './episode-details.component.scss',
  providers: [EpisodeService]
})

export class EpisodeDetailsComponent implements OnInit {
  public episode$: Observable<any>;
  public nextPage: string = "";
  @ViewChild('episodeDetails') episodeDetails!: ElementRef;
  private readonly route = inject(ActivatedRoute);
  selectedId: number = 0;
  constructor(
    private service: EpisodeService
  ) { }
  ngOnInit(): void {
    this.episode$ = this.route.paramMap.pipe(
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