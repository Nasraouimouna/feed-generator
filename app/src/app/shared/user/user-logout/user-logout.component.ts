import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-logout',
  templateUrl: './user-logout.component.html',
  styleUrls: ['./user-logout.component.scss']
})
export class UserLogoutComponent implements OnInit {

  @Input() currentUser;
  @Output() onLogout:EventEmitter<any>;
   
  constructor() {  
    this.onLogout=new EventEmitter();  
   }
 
   ngOnInit() {
       
   }
   
   getAvatar(path) {
     return path ? `${environment.API_URL}/`+ path : 'assets/default-avatar.jpg';
   }
 
   logout(){
       this.onLogout.emit();
   }

}
