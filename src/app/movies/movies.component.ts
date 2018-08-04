import { Component, OnInit } from '@angular/core';
import { YtsService } from '../service/yts.service'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) { }
  public movies: any[];
  public isLoading = true;

  ngOnInit() {
    this.getYtsMovies();
  }

  getYtsMovies(): void {
    this.ytsService.getMoviePage()
      .subscribe(movies => {
        this.movies = movies;
        this.isLoading = false;
      }
      );
  }

}
