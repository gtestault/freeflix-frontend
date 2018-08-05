import { Component, OnInit, Input } from '@angular/core';
import { YtsService } from '../service/yts.service'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  constructor(private ytsService: YtsService, private route: ActivatedRoute) {
  }
  public loadingText: string = "fetching torrent";
  public isLoading: boolean = true;
  public videoAvailable: boolean = false;
  public currentMediaURL: string;
  public contentType: string = "video/mp4"
  @Input() videoTitle: string;
  public infoHash: string;

  ngOnInit() {
    this.fetchTorrent();
  }

  private fetchTorrent() {
    //the movie is referenced by its infoHash but movie makes a more user friendly URL
    this.infoHash = this.route.snapshot.queryParamMap.get("movie");
    this.currentMediaURL = "http://localhost:8080/api/movie/watch?infoHash=" + this.infoHash;
    if (this.infoHash === null || this.infoHash === "") {
      this.loadingText = "video is unavailable";
      return;
    }
    this.ytsService.pollForMovieFetched(this.infoHash).subscribe(_ => {
      this.loadingText = "buffering";
      this.isLoading = false;
      this.videoAvailable = true;
    });
  }
}