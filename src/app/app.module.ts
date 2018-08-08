import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';

//external imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PlayerComponent } from './player/player.component';
import { LoadingComponent } from './player/loading/loading.component';
import { MovieCardComponent } from './movies/movie-card/movie-card.component';
import { DownloadsComponent } from './movies/downloads/downloads.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    PlayerComponent,
    LoadingComponent,
    MovieCardComponent,
    DownloadsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatBadgeModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
