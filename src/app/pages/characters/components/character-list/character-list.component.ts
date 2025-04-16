import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CharacterService } from '../../services/character.service';
import { HttpClientModule } from '@angular/common/http';
import { SearchService } from '../../../../shared/service/search.service';

@Component({
  selector: 'app-character-list',
  imports: [
    HttpClientModule
  ],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss',
  providers: [CharacterService]
})

export class CharacterListComponent implements OnInit {
  public characters: any[] = [];
  public nextPage: string = "";
  @ViewChild('characterList') characterList!: ElementRef;
  constructor(
    private service: CharacterService,
    private searchService: SearchService
  ) { }
  
  ngOnInit(): void {
    this.getCharacters();
    this.searchService.searchEvent.subscribe((x) => {
      this.characters = [];
      this.getCharacters()
    })
  }

  getCharacters(page: string = "") {
    this.service.getAll(page, this.searchService.searchValue)
      .subscribe((characterList) => {
        if (characterList) {
          this.characters.push(...characterList.results);
          this.nextPage = characterList.info.next.slice(characterList.info.next.indexOf("page="))
        }
      });
  }

  @HostListener('document:scroll', ['$event'])
  onScroll() {
    // Captures / defines current window height when called
    const windowHeight = window.innerHeight;
    // Captures bounding rectangle of 5th element
    const boundingRectFive = this.characterList.nativeElement.getBoundingClientRect();
    // Captures bounding rectangle of 8th element
    if ((boundingRectFive.bottom - 400) <= windowHeight)
      this.getCharacters(this.nextPage);
  }
}
