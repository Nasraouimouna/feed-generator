import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { IPicture } from '../../models/picture.model';
import { GalleryService } from '../gallery.service';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-admin-picture-list',
  templateUrl: './admin-picture-list.component.html',
  styleUrls: ['./admin-picture-list.component.scss']
})
export class AdminPictureListComponent implements OnInit {
  private pictureList: IPicture[];
  private subscription;
  public dataSource: any;

  public displayedColumns = ["title", "url","user","createAt"];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  
  constructor(
    private galleryService: GalleryService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.reloadPictures();
  }

  reloadPictures() {
    this.subscription = this.galleryService.getAllPictures().subscribe(
      {
        next: (response: IApiResponse) => {
          this.pictureList = response.payload;
          this.dataSource = new MatTableDataSource<IPicture>(this.pictureList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.snackBar.open(response.message, 'Close');
          this.isLoadingResults = false;
        },
        error: error => {
          this.snackBar.open(error.message, 'Close');
          this.isLoadingResults = true;
        },
        complete: () => {
          this.isLoadingResults = false;

        }
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.pictureList);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  
  getPictureUrl(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }


}
