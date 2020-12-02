import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/user/authentication.service';
import { IUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-front-navbar',
  templateUrl: './front-navbar.component.html',
  styleUrls: ['./front-navbar.component.scss']
})
export class FrontNavbarComponent implements OnInit {
  public currentUser: IUser;
 
  constructor(private router:Router,private authenticationService:AuthenticationService) { 
    
  }

  ngOnInit() { 
    this.authenticationService.currentUser.subscribe(tmpUser=>this.currentUser=tmpUser);
  }

  logout(){
    this.authenticationService.logout();
    this.router.navigate(['/home']);
  }

}
