import { Routes } from '@angular/router';
import { CharacterDetailsComponent } from './pages/characters/components/character-details/character-details.component';
import { CharacterListComponent } from './pages/characters/components/character-list/character-list.component';
import { EpisodeDetailsComponent } from './pages/episodes/components/episode-details/episode-details.component';
import { EpisodeListComponent } from './pages/episodes/components/episode-list/episode-list.component';
import { LocationListComponent } from './pages/location/components/location-list/location-list.component';
import { LocationDetailsComponent } from './pages/location/components/location-details/location-details.component';

export const routes: Routes = [
    { path: 'character-details/:id', component: CharacterDetailsComponent },
    { path: 'character-list', component: CharacterListComponent },
    { path: 'episode-details/:id', component: EpisodeDetailsComponent },
    { path: 'episode-list', component: EpisodeListComponent },
    { path: 'location-details/:id', component: LocationDetailsComponent },
    { path: 'location-list', component: LocationListComponent }
]
