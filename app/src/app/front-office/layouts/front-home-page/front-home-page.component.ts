import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../shared/user/authentication.service';
import { IUser } from 'src/app/shared/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-front-home-page',
  templateUrl: './front-home-page.component.html',
  styleUrls: ['./front-home-page.component.scss']
})
export class FrontHomePageComponent implements OnInit,OnDestroy {
  currentUser:IUser;
  subscription:Subscription;

  constructor(private authenticationService:AuthenticationService) { }
  
  ngOnInit() {
    this.subscription=this.authenticationService.currentUser.subscribe(user=>this.currentUser=user);
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
