import { environment } from '../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialog } from '@angular/material';
import { IApiResponse } from '../../models/api-response.model';
import { IUser } from '../../models/user.model';
import { UserService } from '../user.service';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
  private userList: IUser[];
  private subscription;
  public dataSource: any;

  public displayedColumns = ["fullusername", "email", "_role", "avatar", "customer", "granted", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  isLoadingResults = true;
  resultsLength;

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
      this.reloadUsers();
  }


  reloadUsers() {
    this.subscription = this.userService.getAllUsers().subscribe(
      {
        next: (response: IApiResponse) => {
          this.userList = response.payload;
          this.dataSource = new MatTableDataSource<IUser>(this.userList);
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

  deleteUser(id){
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '450px',
        data: "Do you confirm the deletion of this User? "
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
         this.userService.deleteUser(id).subscribe({
           next:(response:IApiResponse)=>{
              this.snackBar.open(response.message,'Close');
              this.reloadUsers();
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
    this.dataSource = new MatTableDataSource(this.userList);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

 
  getAvatar(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-avatar.jpg'
  }

  getLogo(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }



}




