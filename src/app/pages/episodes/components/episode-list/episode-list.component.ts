import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { EpisodeService } from '../../services/episode.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../../../../shared/service/search.service';

@Component({
  selector: 'app-episode-list',
  imports: [HttpClientModule],
  templateUrl: './episode-list.component.html',
  styleUrl: './episode-list.component.scss',
    providers:[ EpisodeService]
  
})
export class EpisodeListComponent {
  public episodes: any[] = [];
  public nextPage: string =  "";
  @ViewChild('episodeList') episodeList!: ElementRef;
  constructor(
    private service: EpisodeService,
    private searchService: SearchService
  ){}
  ngOnInit(): void {
    this.getEpisode();
    this.searchService.searchEvent.subscribe((x) => {
      this.episodes = [];
      this.getEpisode()
    })
  }

  getEpisode(page:string = ""){
    this.service.getAll(page, this.searchService.searchValue)
    .subscribe((episodeList) => {
      if (episodeList) {
        this.episodes.push(...episodeList.results);
        this.nextPage = episodeList.info.next.slice(episodeList.info.next.indexOf("page="))
      } 
    });
  }

  @HostListener('document:scroll', ['$event'])
  onScroll(){
// Captures / defines current window height when called
const windowHeight = window.innerHeight;
// Captures bounding rectangle of 5th element
const boundingRectFive = this.episodeList.nativeElement.getBoundingClientRect();
// Captures bounding rectangle of 8th element
    if((boundingRectFive.bottom - 400) <= windowHeight)
      this.getEpisode(this.nextPage);
  }
}
