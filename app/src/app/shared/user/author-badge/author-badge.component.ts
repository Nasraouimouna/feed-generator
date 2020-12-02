import { Component, OnInit, Input } from '@angular/core';
import { IUser } from '../../models/user.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-author-badge',
  templateUrl: './author-badge.component.html',
  styleUrls: ['./author-badge.component.scss']
})
export class AuthorBadgeComponent implements OnInit {
  @Input('') userInfo:IUser;
  constructor() { }

  ngOnInit() {
  }

  getAvatar(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-avatar.jpg'
  }
  

}
