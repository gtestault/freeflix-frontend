import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  animations: [
    trigger('movieState', [
      state('inactive', style({
        borderColor: "black"
      })),
      state('active',   style({
        borderColor: 'red',
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ]),
    trigger('movieStateDim', [
      state('inactive', style({
        opacity: 1.0
      })),
      state('active', style({
        opacity: 0.2
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ]),
    trigger('movieStateShow', [
      state('inactive', style({
        opacity: 0
      })),
      state('active', style({
        opacity: 1
      })),
      transition('inactive => active', animate('0ms ease-in')),
      transition('active => inactive', animate('0ms ease-out'))
    ])
  ]
})
export class MovieCardComponent implements OnInit {

  constructor() { }
  public state = "inactive";
  @Input() public movie : any;
  ngOnInit() {
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
