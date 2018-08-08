import { Component, OnInit } from '@angular/core';
import { YtsService } from '../../service/yts.service'
import {TorrentStatus} from '../../service/torrentStatus'

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  constructor(private ytsService: YtsService) { }

  public status: TorrentStatus[]
  public activeTorrents = 0;

  ngOnInit() {
    this.getTorrentStatus()
  }

  public getTorrentStatus() {
    this.ytsService.getTorrentStatus()
    .subscribe((status: TorrentStatus[]) => {
      this.status = status
      this.activeTorrents = status.length
    })
  }


}
