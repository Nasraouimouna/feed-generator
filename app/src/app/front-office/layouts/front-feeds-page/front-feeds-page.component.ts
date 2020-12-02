import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/user/authentication.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-front-feeds-page',
  templateUrl: './front-feeds-page.component.html',
  styleUrls: ['./front-feeds-page.component.scss']
})
export class FrontFeedsPageComponent implements OnInit {
  currentUser:IUser;
  constructor(private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(tmpUser=>this.currentUser=tmpUser);
  }

}
