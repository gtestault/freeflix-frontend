import { Component, OnInit, HostListener } from '@angular/core';
import { YtsService } from '../service/yts.service'
import { TorrentStatus } from '../service/torrentStatus'

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private ytsService: YtsService) { }

  private queryState : {query:string, page: number} = {
    query: "",
    page: 1
  }
  public movies: any[];
  public isLoading = true;
  public activeTorrents = 0;
  ngOnInit() {
    this.getYtsMovies("")
    this.getActiveTorrents()
  }

  @HostListener("window:scroll", [])
  onScroll(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.updateYtsMovies()
    }
  }

  public onSearch(query: string) {
    this.getYtsMovies(query)
    this.queryState.query = query
  }

  private updateYtsMovies() {
    if (this.isLoading) {
      return
    }
    this.isLoading = true
    this.queryState.page += 1
    this.ytsService.getMoviePage(this.queryState.query, String(this.queryState.page))
      .subscribe(movies => {
        this.movies.push(...movies)
        this.isLoading = false;
    }
    );

  }

  getYtsMovies(query: string): void {
    this.ytsService.getMoviePage(query, "")
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
