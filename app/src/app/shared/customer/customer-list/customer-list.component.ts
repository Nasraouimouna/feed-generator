import { environment } from '../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource, MatDialog } from '@angular/material';
import { ICustomer } from '../../models/customer.model';
import { CustomerService } from '../customer.service';
import { IApiResponse } from '../../models/api-response.model';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  private customerList: ICustomer[];
  private subscription;
  public dataSource: any;

  public displayedColumns = ["fullname", "adress", "city", "isLicenced", "logo_url", "actions"];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  isLoadingResults = true;
  resultsLength;


  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.reloadCustomers();
  }

  reloadCustomers() {
    this.subscription = this.customerService.getAllCustomers().subscribe(
      {
        next: (response: IApiResponse) => {
          this.customerList = response.payload;
          this.dataSource = new MatTableDataSource<ICustomer>(this.customerList);
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

  
  removeCustomer(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Do you confirm the deletion of this Customer? "
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked');
       this.customerService.deleteCustomer(id).subscribe({
         next:(response:IApiResponse)=>{
            this.snackBar.open(response.message,'Close');
            this.reloadCustomers();
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
    this.dataSource = new MatTableDataSource(this.customerList);
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
