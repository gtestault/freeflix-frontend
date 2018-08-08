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
  }
  @Input() public page = "downloads"
  @Output() search = new EventEmitter<string>();

  public getColor() : string {
    if (this.page === "downloads") {
      return "red"
    }
    return "white"
  }

  public getRedirect() : string {
    if (this.page === "downloads") {
      return "/movies"
    }
    return "/downloads"
  }

  public searchMovie(query: string): boolean {
    this.search.emit(query);
    return false;
  }

  ngOnInit() {
  }

}
