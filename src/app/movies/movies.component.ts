import { Component, OnInit } from '@angular/core';
import { YtsService } from '../service/yts.service'
import { TorrentStatus } from '../service/torrentStatus'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) { }

  public movies: any[];
  public isLoading = true;
  public activeTorrents = 0;
  ngOnInit() {
    this.getYtsMovies("")
    this.getActiveTorrents()
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

  public getActiveTorrents() {
    this.ytsService.getTorrentStatus()
      .subscribe((status: TorrentStatus[]) => {
        this.activeTorrents = status.length
      })
  }
}
