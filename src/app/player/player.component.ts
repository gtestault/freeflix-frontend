import {Component, OnInit, Input, HostListener} from "@angular/core"
import {YtsService} from "../service/yts.service"
import {ActivatedRoute} from "@angular/router"
import {environment} from "../../environments/environment"
import {MatIconRegistry} from "@angular/material"
import {DomSanitizer} from "@angular/platform-browser"

@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.scss"]
})
export class PlayerComponent implements OnInit {
  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private ytsService: YtsService,
    private route: ActivatedRoute) {
    iconRegistry.addSvgIcon(
      "cc",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/closed-captioning.svg"))
    iconRegistry.addSvgIcon(
      "compress",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/compress.svg"))
    iconRegistry.addSvgIcon(
      "expand",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/expand.svg"))
    iconRegistry.addSvgIcon(
      "pause",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/pause.svg"))
    iconRegistry.addSvgIcon(
      "play",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/play.svg"))
    iconRegistry.addSvgIcon(
      "volume-up",
      sanitizer.bypassSecurityTrustResourceUrl("../assets/icons/player/volume-up.svg"))
  }

  public loadingText = "fetching torrent"
  public isLoading = true
  public videoAvailable = false
  public currentMediaURL: string
  public endpoint = environment.endpoint
  @Input() videoTitle: string
  public infoHash: string
  public poster: string
  public playing: boolean

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
      setTimeout(() => {
        this.initControls()
      }, 100)
    })
  }

  @HostListener("document:keypress", ["$event"])
  handleKeyboardEvent(event: KeyboardEvent) {
    const KEYCODE_SPACE = 32
    const video = <HTMLVideoElement>document.getElementById("video")
    if (event.keyCode === KEYCODE_SPACE && video != null) {
      if (video.paused || video.ended) {
        video.play()
        this.playing = true
      } else {
        video.pause()
        this.playing = false
      }
    }
  }

  private initControls() {
    // We assume the browser supports the video tag.
    const videoContainer = document.getElementById("videoContainer")
    const video = <HTMLVideoElement>document.getElementById("video")
    const videoControls = document.getElementById("video-controls")
    video.controls = false

    const playpause = document.getElementById("playpause")
    const mute = document.getElementById("mute")
    const volinc = document.getElementById("volinc")
    const voldec = document.getElementById("voldec")
    const progress = document.getElementById("progress")
    const progressBar = document.getElementById("progress-bar")
    const fullscreen = document.getElementById("fs")

    playpause.addEventListener("click", () => {
      if (video.paused || video.ended) {
        video.play()
        this.playing = true
      } else {
        video.pause()
        this.playing = false
      }
    })

    mute.addEventListener("click", () => {
      video.muted = !video.muted
    })

    volinc.addEventListener("click", () => {
      alterVolume("+")
    })

    voldec.addEventListener("click", () => {
      alterVolume("-")
    })

    const alterVolume = (dir) => {
      const currentVolume = Math.floor(video.volume * 10) / 10
      if (dir === "+") {
        if (currentVolume < 1) {
          video.volume += 0.1
        }
      } else if (dir === "-") {
        if (currentVolume > 0) {
          video.volume -= 0.1
        }
      }
    }
  }// End init controls
}
