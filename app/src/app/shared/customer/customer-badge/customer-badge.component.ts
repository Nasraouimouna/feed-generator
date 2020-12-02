import { Component, OnInit, Input } from '@angular/core';
import { ICustomer } from '../../models/customer.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer-badge',
  templateUrl: './customer-badge.component.html',
  styleUrls: ['./customer-badge.component.scss']
})
export class CustomerBadgeComponent implements OnInit {
 @Input('') customer:ICustomer;
 
 constructor() { }

  ngOnInit() {
  }

  getLogo(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

}
