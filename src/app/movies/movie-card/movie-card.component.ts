import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  constructor() { }
  public borderColor = "black";
  public textOpacity = 0;
  public imgOpacity = 1;

  @Input() public movie : any;
  ngOnInit() {
  }

  public setActive() {
    this.borderColor = "red"
    this.textOpacity = 1;
    this.imgOpacity = 0.2;

  }

  public setInactive() {
    this.borderColor = "black"
    this.textOpacity = 0;
    this.imgOpacity = 1;
  }

  getHashFromTorrent(torrent: any[]): string {
    if (torrent === null) {
      return "";
    } else if (torrent.length === 2) {
      return torrent[1].Hash;
    }
    return torrent[0].Hash;
  }

}
