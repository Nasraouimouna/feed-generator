import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user.model';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/user/authentication.service';

@Component({
  selector: 'app-back-navbar',
  templateUrl: './back-navbar.component.html',
  styleUrls: ['./back-navbar.component.scss']
})
export class BackNavbarComponent implements OnInit {
  public currentUser: IUser;
  constructor(private router:Router,private authenticationService:AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(tmpUser=>this.currentUser=tmpUser);
  }
  
  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }
}
