import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IUser } from '../../models/user.model';
import { AuthenticationService } from '../../user/authentication.service';
import { FeedsService } from '../feeds.service';
import { Subscription } from 'rxjs';
import { IApiResponse } from '../../models/api-response.model';
import { IArticle } from '../../models/article.model';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-featured-article',
  templateUrl: './featured-article.component.html',
  styleUrls: ['./featured-article.component.scss']
})
export class FeaturedArticleComponent implements OnInit, OnDestroy {
  currentUser: IUser;
  featuredArticle: IArticle;
  articleSubscription: Subscription;
  isThereFeaturedArticle: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private articleService: FeedsService,
    private snackbar: MatSnackBar
  ) {
    
   }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user=>this.currentUser=user);
    this.articleSubscription = this.articleService.getFeaturedArticle(this.currentUser._id).subscribe({
      next: (response: IApiResponse) => {
        if (response.status === "success" && response.payload.length > 0) {
          this.featuredArticle = response.payload[0];
          this.isThereFeaturedArticle = true;
        } else {
          this.isThereFeaturedArticle = false
        }
      },
      error: (error) => {
        this.snackbar.open(error.message, 'Close');
      },
      complete: () => null
    });
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  getCover(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

}
