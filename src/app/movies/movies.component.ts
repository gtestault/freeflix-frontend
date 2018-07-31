import { Component, OnInit } from '@angular/core';
import { YtsService } from '../service/yts.service'
import { MovieYTS } from '../MovieYTS'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) { }
  private movies: MovieYTS[];

  ngOnInit() {
    this.getYtsMovies();
  }

  getYtsMovies(): void {
    this.ytsService.getMoviePage()
      .subscribe(movies => this.movies = movies);
  }

}
