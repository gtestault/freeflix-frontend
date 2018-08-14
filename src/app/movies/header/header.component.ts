import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'cloud',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/cloud-download-regular.svg'));
    iconRegistry.addSvgIcon(
      'params',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/sliders-h-regular.svg'));
  }

  @Input() public page = "downloads"
  @Input() public activeTorrents = 0;
  @Output() search = new EventEmitter<string>();

  public getColor(): string {
    if (this.page === "downloads") {
      return "red"
    }
    return "white"
  }

  public getTorrentNotification(): string {
    if (this.activeTorrents === 0) {
      return ""
    }
    return String(this.activeTorrents)
  }

  public getRedirect(): string {
    if (this.page === "downloads") {
      return "/movies"
    }
    return "/downloads"
  }

  IsSearchBarVisible(): boolean {
    if (this.page === "downloads") {
      return false;
    }
    return true;
  }

  public searchMovie(query: string): boolean {
    this.search.emit(query);
    return false;
  }

  ngOnInit() {
  }

}
