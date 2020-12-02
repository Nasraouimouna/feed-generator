import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { MatSnackBar } from '@angular/material';
import { ICustomer } from '../../models/customer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IApiResponse } from '../../models/api-response.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.scss']
})
export class UpdateCustomerComponent implements OnInit {
  customerToEdit: ICustomer;
  customerId: string;
  subscription: Subscription;
  customerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(param => this.customerId = param.id);
    this.getCustomer(this.customerId);
    
    this.customerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required],
      isLicenced:[false]
    })
  }

  getCustomer(id) {
    this.subscription = this.customerService.getCustomerById(id).subscribe(
      {
        next: (response: IApiResponse) => {
            this.customerToEdit=response.payload;
            this.intialiseCurrentCustomerFormControls(this.customerToEdit);
        },
        error: (error) => {
          this.snackBar.open(error.message);
        },
        complete: () => null
      });


  }

  intialiseCurrentCustomerFormControls(customer:ICustomer):void {
    this.customerForm.controls['fullname'].setValue(customer.fullname);
    this.customerForm.controls['adress'].setValue(customer.adress);
    this.customerForm.controls['city'].setValue( customer.city);
    this.customerForm.controls['isLicenced'].setValue(customer.isLicenced?customer.isLicenced:false);
  }

  isLicencedChange(event){
    this.customerForm.controls['isLicenced'].setValue(event.checked);
  }

  refresh($event) {
    console.log($event);
  }
  
  getLogo(url) {
    return url ? `${environment.API_URL}/${url}` : 'assets/default-logo.png'
  }

  submitUpdateCustomer() {
    this.customerService.updateCustomer(this.customerId,this.customerForm.value).subscribe({
      next: (response: IApiResponse) => {
        this.snackBar.open(response.message, 'Close');
      },
      error: (error) => this.snackBar.open(error.message, 'Close'),
      complete: () => null
    });
    this.customerForm.reset();
    this.router.navigate(['back/customer']);
  }

}
