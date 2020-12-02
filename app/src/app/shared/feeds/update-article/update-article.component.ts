import { Component, OnInit } from '@angular/core';
import { IArticle } from '../../models/article.model';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FeedsService } from '../feeds.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../../models/api-response.model';
import { IUser } from '../../models/user.model';
import { editorConfig as Config } from '../../helpers/editor.config';
import { AuthenticationService } from '../../user/authentication.service';
import { GalleryService } from '../../gallery/gallery.service';
import { IPicture } from '../../models/picture.model';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss']
})
export class UpdateArticleComponent implements OnInit {
  currentUser: IUser;
  articleToEdit: IArticle;
  articleId: string;
  articleForm: FormGroup;
  pictures: IPicture[];
  pictureSubscription: Subscription;
  articleSubscription: Subscription;

  editorConfig = Config;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private galleryService: GalleryService,
    private articleService: FeedsService,
  ) { }

  ngOnInit() {

    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.route.params.subscribe(param => this.articleId = param.id);
    this.getArticle(this.articleId);

    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      author: ['', Validators.required],
      cover: ['', Validators.required],
      isFeatured: [false]
    })

    this.loadUserPictures();
     
  }

  getArticle(id) {
    this.articleSubscription = this.articleService.getArticleById(id).subscribe(
      {
        next: (response: IApiResponse) => {
          this.articleToEdit = response.payload;
          this.intialiseCurrentArticleFormControls(this.articleToEdit);
        },
        error: (error) => {
          this.snackBar.open(error.message);
        },
        complete: () => null
      });


  }

  intialiseCurrentArticleFormControls(article: IArticle): void {
    this.articleForm.controls['title'].setValue(article.title);
    this.articleForm.controls['description'].setValue(article.description);
    this.articleForm.controls['content'].setValue(article.content);
    this.articleForm.controls['author'].setValue(article.author._id);
    this.articleForm.controls['cover'].setValue(article.cover._id);
    this.articleForm.controls['isFeatured'].setValue(article.isFeatured ? article.isFeatured : false);
  }

  loadUserPictures() {
    this.pictureSubscription = this.galleryService.getPictureByOwnerId(this.currentUser._id).subscribe(
      {
        next: (response: IApiResponse) => {
          this.pictures = response.payload;
        },
        error: error => {
          this.snackBar.open(error.message, 'Close');
        },
        complete: () => {

        }
      }
    )
  }

  isFeaturedChange(event) {
    this.articleForm.controls['isFeaturd'].setValue(event.checked);
  }

  refresh($event) {
    console.log($event);
  }

  getPicture(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

  submitUpdatedArticle() {
    this.articleService.updateArticle(this.articleId, this.articleForm.value).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close');
      },
      error: (error) => this.snackBar.open(error.message, 'Close'),
      complete: () => null
    });
    this.articleForm.reset();
    this.router.navigate(['front/feeds']);
  }

  
  ngOnDestroy() {
    this.pictureSubscription.unsubscribe();
    this.articleSubscription.unsubscribe();
  }


}
