import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatSnackBar, MatTableDataSource } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { startWith, switchMap, map, catchError } from 'rxjs/operators';
import { IArticle } from '../../models/article.model';
import { FeedsService } from '../feeds.service';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../../models/api-response.model';
import { AuthenticationService } from '../../user/authentication.service';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './admin-article-list.component.html',
  styleUrls: ['./admin-article-list.component.scss']
})
export class AdminArticleListComponent implements OnInit {
  private articleList: IArticle[];
  private articleSubscription: Subscription;
  private userSubscription: Subscription;
  public dataSource: any;
  public displayedColumns = ["createAt", "title", "description", "picture", "featured", 'author', 'customer'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  data: [];

  resultsLength = 0;
  isLoadingResults = true;

  constructor(
    private articleService: FeedsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.reloadArticles();
  }

  reloadArticles() {
    this.articleSubscription = this.articleService.getAllArticles().subscribe(
      {
        next: (response: IApiResponse) => {
          this.articleList = response.payload;
          this.dataSource = new MatTableDataSource<IArticle>(this.articleList);
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
    this.dataSource = new MatTableDataSource(this.articleList);
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.articleSubscription) {
      this.articleSubscription.unsubscribe();
    }
  }


  getPicture(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

}
