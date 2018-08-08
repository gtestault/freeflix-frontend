import { Component, OnInit } from '@angular/core';
import { YtsService } from '../service/yts.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) {}

  public movies: any[];
  public isLoading = true;

  ngOnInit() {
    this.getYtsMovies("");
  }

  public onSearch(query: string) {
    this.getYtsMovies(query);
  }

  getYtsMovies(query: string): void {
    this.ytsService.getMoviePage(query)
      .subscribe(movies => {
        this.movies = movies;
        this.isLoading = false;
      }
      );
  }

}
