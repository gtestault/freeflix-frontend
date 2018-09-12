import {Component, OnInit, Input} from "@angular/core"
import {YtsService} from "../service/yts.service"
import {ActivatedRoute} from "@angular/router"
import {environment} from "../../environments/environment"

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  constructor(private ytsService: YtsService, private route: ActivatedRoute) {
  }

  public loadingText = "fetching torrent"
  public isLoading = true
  public videoAvailable = false
  public currentMediaURL: string
  public endpoint = environment.endpoint
  @Input() videoTitle: string
  public infoHash: string
  public poster: string

  ngOnInit() {
    // Cover image if video is not started.
    this.poster = this.route.snapshot.queryParamMap.get("poster")
    this.fetchTorrent()
  }

  private fetchTorrent() {
    this.infoHash = this.route.snapshot.queryParamMap.get("movie")
    this.currentMediaURL = this.endpoint + "/api/movie/watch?infoHash=" + this.infoHash
    if (this.infoHash === null || this.infoHash === "") {
      this.loadingText = "video is unavailable"
      return
    }
    this.ytsService.pollForMovieFetched(this.infoHash).subscribe(_ => {
      this.loadingText = "buffering"
      this.isLoading = false
      this.videoAvailable = true
      // We need to wait a bit for the video tag to render in the DOM.
      setTimeout( () => { this.initControls() }, 100)
    })
  }

  private initControls() {
    // We assume the browser supports the video tag.
    const videoContainer = document.getElementById('videoContainer')
    const video = <HTMLVideoElement>document.getElementById('video')
    const videoControls = document.getElementById('video-controls')
    video.controls = false

    const playpause = document.getElementById('playpause')
    const mute = document.getElementById('mute')
    const volinc = document.getElementById('volinc')
    const voldec = document.getElementById('voldec')
    const progress = document.getElementById('progress')
    const progressBar = document.getElementById('progress-bar')
    const fullscreen = document.getElementById('fs')

    playpause.addEventListener('click', () => {
      if (video.paused || video.ended) { video.play() } else { video.pause() }
    })

    mute.addEventListener('click', () => {
      video.muted = !video.muted
    })

    volinc.addEventListener('click', () => {
      alterVolume('+')
    })

    voldec.addEventListener('click', () => {
      alterVolume('-')
    })

    const alterVolume = (dir) => {
      const currentVolume = Math.floor(video.volume * 10) / 10
      if (dir === '+') {
        if (currentVolume < 1) { video.volume += 0.1 }
      } else if (dir === '-') {
        if (currentVolume > 0) { video.volume -= 0.1 }
      }
    }
  }// End init controls
}
