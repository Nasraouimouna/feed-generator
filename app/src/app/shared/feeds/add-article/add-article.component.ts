import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { editorConfig as Config } from '../../helpers/editor.config';
import { IUser } from '../../models/user.model';
import { AuthenticationService } from '../../user/authentication.service';
import { GalleryService } from '../../gallery/gallery.service';
import { MatSnackBar } from '@angular/material';
import { IPicture } from '../../models/picture.model';
import { Subscription } from 'rxjs';
import { IApiResponse } from '../../models/api-response.model';
import { environment } from 'src/environments/environment';
import { FeedsService } from '../feeds.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {
  public currentUser:IUser;
  pictures: IPicture[];
  pictureSubscription: Subscription;
  articleSubscription:Subscription;


  public articleForm: FormGroup;
  editorConfig=Config;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService:AuthenticationService,
    private galleryService: GalleryService, 
    private articleService: FeedsService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(user=>this.currentUser=user);
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required],
      cover: ['', Validators.required],
      author: [this.currentUser._id, Validators.required],
      isFeatured:[false]
    })
    this.loadUserPictures();
  }

  postArticle(){
    this.articleSubscription=this.articleService.postArticle(this.articleForm.value).subscribe({
      next: (response: IApiResponse) => {

        this.snackBar.open(response.message, "Close");
        this.router.navigate(['front/feeds/']);
      },
      error: (error) => {
        this.snackBar.open(error, "Close");
      },
      complete: () => null
    });
    
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
    
    
    getPicture(url) {
      return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
    }
    
    ngOnDestroy() {
      this.pictureSubscription.unsubscribe();
      if( this.articleSubscription){
      this.articleSubscription.unsubscribe();
      }
    }

  
}


