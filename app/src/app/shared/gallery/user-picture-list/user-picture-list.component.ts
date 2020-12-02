import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource, MatDialogConfig } from '@angular/material';
import { GalleryService } from '../gallery.service';
import { IApiResponse } from '../../models/api-response.model';
import { IPicture } from '../../models/picture.model';
import { environment } from 'src/environments/environment';
import { PictureUploaderComponent } from '../picture-uploader/picture-uploader.component';
import { IUser } from '../../models/user.model';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-picture-list',
  templateUrl: './user-picture-list.component.html',
  styleUrls: ['./user-picture-list.component.scss']
})
export class UserPictureListComponent implements OnInit {
  @Input('') currentUser:IUser;
  
  public displayedColumns = ["title", "createdAt","updatedAt","picture","actions"];
  private pictureList: IPicture[];
  private subscription;
  public dataSource: any;

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
    this.subscription = this.galleryService.getPictureByOwnerId(this.currentUser._id).subscribe(
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

  public openUploadDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="50%";
    dialogConfig.height="50%";
   
    let dialogRef = this.dialog.open(PictureUploaderComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result=>{
      this.reloadPictures();
    })
  }

  deletePicture(id){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Remove of this Image ? "
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.galleryService.deletePicture(id).subscribe({
         next:(response:IApiResponse)=>{
            this.snackBar.open(response.message,'Close');
            this.reloadPictures();
         },
         error:(error)=>{
          this.snackBar.open(error.message,'Close');
         },
         complete:()=>null
       });
      }
    });
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
