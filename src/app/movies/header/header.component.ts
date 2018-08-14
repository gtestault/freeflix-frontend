import { Component, OnInit, EventEmitter, Input, Output, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchSorting: string[] = ['title', 'year', 'rating']
  searchOrder: string[] = ['ascending', 'descending']
  sorting: string
  order: string
  rating: number

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
  @Output() search = new EventEmitter<string>();

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
    this.search.emit(query);
    return false;
  }

  public openSearchSettingsDialog() {
    const dialogRef = this.dialog.open(SearchDialog, {  
      data: {
        searchSorting: this.searchSorting,
        searchOrder: this.searchOrder,
      }
    })

    dialogRef.afterClosed().subscribe(settings => {
      this.sorting = settings.sorting
      this.rating = settings.rating
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
