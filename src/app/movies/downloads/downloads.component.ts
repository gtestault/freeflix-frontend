import { Component, OnInit, OnDestroy } from '@angular/core';
import { YtsService } from '../../service/yts.service'
import {TorrentStatus} from '../../service/torrentStatus'
import { Observable, timer, Subscription } from 'rxjs'
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  constructor(private ytsService: YtsService) { }

  public torrentStatusSubscription: Subscription
  public status: TorrentStatus[]
  public activeTorrents = 0;

  ngOnInit() {
    this.torrentStatusSubscription = this.torrentStatus().subscribe((status: TorrentStatus[]) => {
      if (this.activeTorrents === status.length) {
        return
      }
      this.activeTorrents = status.length
      this.status = status
    })
  }

  ngOnDestroy() {
    this.torrentStatusSubscription.unsubscribe()
  }

  public getHumanizedDownloadStatus(torrent: TorrentStatus): string {
    let total = Math.ceil((torrent.BytesDownloaded + torrent.BytesMissing) / 1_000_000)
    let downloaded = Math.ceil(torrent.BytesDownloaded / 1_000_000)
    let prefix = (torrent.BytesMissing !== 0) ? "DOWNLOADING" : "SEEDING" 
    return prefix + " " +  downloaded + " MB / " + total + " MB"  
  }

  public getTorrentPercentage(torrent: TorrentStatus): string {
    let total = torrent.BytesDownloaded + torrent.BytesMissing
    let percentage = String(Math.floor((torrent.BytesDownloaded / total) * 100))
    return percentage
  }
  
  public deleteTorrent(torrent: TorrentStatus) {
    this.ytsService.deleteTorrent(torrent.InfoHash.toUpperCase()).subscribe(_ => {})
  }

  public getProgressBarColor(torrent: TorrentStatus): string {
    if (torrent.BytesMissing === 0) {
      return "warn"
    }
    //little hack, since material progress bar only allows 2 different colors, our warn color is green for seeding :D 
    return "primary"
  }

  private torrentStatus(): Observable<TorrentStatus[]> {
    return timer(0, 5000).pipe(
      switchMap(_ => this.ytsService.getTorrentStatus())
    )
  }


}
