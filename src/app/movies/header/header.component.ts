import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface SearchSettings {
  query? : string
  searchSorting? : "title" | "year" | "rating"
  searchOrder? : "ascending" | "descending"
  rating? : number
  page? : number
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchSortings: string[] = ['title', 'year', 'rating']
  searchOrders: string[] = ['ascending', 'descending']
  searchSettings: SearchSettings = {}

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public dialog: MatDialog) {
    iconRegistry.addSvgIcon(
      'cloud',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/cloud-download-regular.svg'));
    iconRegistry.addSvgIcon(
      'params',
      sanitizer.bypassSecurityTrustResourceUrl('../assets/icons/sliders-h-regular.svg'));
  }

  @Input() public page = "downloads"
  @Input() public activeTorrents = 0;
  @Output() search = new EventEmitter<SearchSettings>();

  ngOnInit() {
  }

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
    this.searchSettings.query = query
    this.search.emit(this.searchSettings);
    return false;
  }

  public openSearchSettingsDialog() {
    const dialogRef = this.dialog.open(SearchDialog, {  
      data: {
        searchSorting: this.searchSortings,
        searchOrder: this.searchOrders,
      }
    })

    dialogRef.afterClosed().subscribe(settings => {
      if (settings.sorting) this.searchSettings.searchSorting = settings.sorting
      if (settings.rating) this.searchSettings.rating = settings.rating
      this.search.emit(this.searchSettings)
    });

  }
}

@Component({
  selector: 'search-dialog',
  templateUrl: './search-dialog/search-dialog.html',
  styleUrls: ['./search-dialog/search-dialog.scss']
})
export class SearchDialog {

  sorting: string
  imdbRating: number

  constructor(
    public dialogRef: MatDialogRef<SearchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public onOkClick(): void {
    this.dialogRef.close({sorting: this.sorting, rating: this.imdbRating});
  }

  public updateRating(rating: number) {
    this.imdbRating = rating
  }
}
