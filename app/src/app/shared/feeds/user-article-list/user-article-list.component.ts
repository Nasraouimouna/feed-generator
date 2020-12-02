import {DomSanitizer} from '@angular/platform-browser';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { FeedsService } from '../feeds.service';
import { IArticle } from '../../models/article.model';
import { IUser } from '../../models/user.model';
import { AuthenticationService } from '../../user/authentication.service';
import { IApiResponse } from '../../models/api-response.model';
import { environment } from 'src/environments/environment';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-article-list',
  templateUrl: './user-article-list.component.html',
  styleUrls: ['./user-article-list.component.scss']
})
export class UserArticleListComponent implements OnInit {
  private currentUser:IUser;
  private articleList: IArticle[];
  private articleSubscription:Subscription;
  private userSubscription:Subscription;
  public dataSource: any;

  public displayedColumns = ["createAt", "title", "description","picture","featured","actions"];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  data:[];

  resultsLength = 0;
  isLoadingResults = true;
  
  constructor(
    private authentication:AuthenticationService,
    private articleService: FeedsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.userSubscription=this.authentication.currentUser.subscribe(user=>this.currentUser=user);
    this.reloadArticles();
  }

  reloadArticles() {
    this.articleSubscription = this.articleService.getArticlesByAuthor(this.currentUser._id).subscribe(
      {
        next: (response: IApiResponse) => {
          this.articleList = response.payload;
          this.dataSource = new MatTableDataSource<IArticle>(this.articleList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          //this.snackBar.open(response.message, 'Close');
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

  deleteArticle(id){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Remove this Article?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.articleService.deleteArticle(id).subscribe({
         next:(response:IApiResponse)=>{
            this.snackBar.open(response.message,'Close');
            this.reloadArticles();
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
    this.dataSource = new MatTableDataSource(this.articleList);
  }
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
    this.articleSubscription.unsubscribe();
  }
  
  
  getPicture(url){
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

  setFeaturedArticle(articleId){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      data: "Set this Article as Featured?"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.articleService.setFaturedArticle(this.currentUser._id,articleId).subscribe({
         next:(response:IApiResponse)=>{
            this.snackBar.open(response.message,'Close');
            this.reloadArticles();
         },
         error:(error)=>{
          this.snackBar.open(error.message,'Close');
         },
         complete:()=>null
       });
      }
    });
  }
}

