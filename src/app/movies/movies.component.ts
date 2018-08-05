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
    this.getYtsMovies("");
  }

  getHashFromTorrent(torrent: any[]): string {
    if (torrent === null) {
      return "";
    } else if (torrent.length === 2) {
      return torrent[1].Hash;
    }
    return torrent[0].Hash;
  }

  searchMovie(query: string) : boolean {
    this.getYtsMovies(query)
    return false;
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
