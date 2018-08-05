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
  public videoAvailable: boolean = false;
  @Input() videoTitle: string;
  private infoHash: string;

  ngOnInit() {
    this.fetchTorrent();
  }

  private fetchTorrent() {
    //the movie is referenced by its infoHash but movie makes a more user friendly URL
    this.infoHash = this.route.snapshot.queryParamMap.get("movie");
    if (this.infoHash === null || this.infoHash === "") {
      this.loadingText = "video is unavailable";
      return;
    }
    this.ytsService.pollForMovieFetched(this.infoHash).subscribe(_ => {
      this.loadingText = "buffering"
      this.videoAvailable = true;
    });
  }
}
