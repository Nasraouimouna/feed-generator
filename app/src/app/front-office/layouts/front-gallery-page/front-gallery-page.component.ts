import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/user/authentication.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-front-gallery-page',
  templateUrl: './front-gallery-page.component.html',
  styleUrls: ['./front-gallery-page.component.scss']
})
export class FrontGalleryPageComponent implements OnInit {
  currentUser:IUser;
  
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(tmpUser=>this.currentUser=tmpUser);
  }

}
