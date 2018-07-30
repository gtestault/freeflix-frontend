import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';

//external imports
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSidenavModule} from '@angular/material/sidenav';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
