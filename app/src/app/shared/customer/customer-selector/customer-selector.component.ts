
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ICustomer } from '../../models/customer.model';
import { IApiResponse } from '../../models/api-response.model';
import { CustomerService } from '../customer.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-customer-selector',
  templateUrl: './customer-selector.component.html',
  styleUrls: ['./customer-selector.component.scss']
})
export class CustomerSelectorComponent implements OnInit, OnDestroy {
  @Input('') selectedCustomer: ICustomer;
  @Output('') onCustomerChangeSelection:EventEmitter<ICustomer>=new EventEmitter<ICustomer>();

  customers: ICustomer[];
  subscription: Subscription;


  constructor(private customerService: CustomerService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.subscription = this.customerService.getAllCustomers()
      .subscribe({
        next: (response: IApiResponse) => {
          this.customers = response.payload as ICustomer[];
        },
        error: (error) => {
          this.snackBar.open(error.message, "Close");
        },
        complete: () => null
      });

  }

  onChangeSelection(event){
     this.onCustomerChangeSelection.emit(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getLogo(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

}
