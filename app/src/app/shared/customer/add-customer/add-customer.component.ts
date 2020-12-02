import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomerService } from '../customer.service';
import { IApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {

  customerForm: FormGroup;
  
  constructor( private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      adress: ['', Validators.required],
      city: ['', Validators.required],
    })
  }

  submitCustomer() {
    this.customerService.postCustomer(this.customerForm.value).subscribe({
      next: (response: IApiResponse) => {

        this.snackBar.open(response.message, "Close");
        this.router.navigate(['back/customer']);
      },
      error: (error) => {
        this.snackBar.open(error, "Close");
      },
      complete: () => null
    });
  }

}
