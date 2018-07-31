import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PlayerComponent } from '../player/player.component';
import { MoviesComponent } from '../movies/movies.component';

const routes: Routes = [
  { path: 'player', component: PlayerComponent },
  { path: 'movies', component: MoviesComponent },
  { path: '', redirectTo: 'movies', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
