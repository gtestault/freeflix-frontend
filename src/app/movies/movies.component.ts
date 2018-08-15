import { Component, OnInit, HostListener } from '@angular/core';
import { YtsService } from '../service/yts.service'
import { TorrentStatus } from '../service/torrentStatus'
import { SearchSettings } from './header/header.component'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) { }

  private queryState: SearchSettings = {
    page: 1
  }
  public movies: any[];
  public isLoading = true;
  public activeTorrents = 0;

  ngOnInit() {
    this.getYtsMovies(this.queryState)
    this.getActiveTorrents()
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.updateYtsMovies()
    }
  }

  public onSearch(searchSettings: SearchSettings) {
    this.queryState = searchSettings
    this.queryState.page = 1
    console.log(this.queryState)
    this.getYtsMovies(this.queryState)
  }

  private updateYtsMovies() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.queryState.page += 1
    this.ytsService.getMoviePage(this.queryState)
      .subscribe(movies => {
        this.movies.push(...movies)
        this.isLoading = false;
      }
      );

  }

  getYtsMovies(queryState: SearchSettings): void {
    this.ytsService.getMoviePage(queryState)
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