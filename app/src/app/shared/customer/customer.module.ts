import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerBadgeComponent } from './customer-badge/customer-badge.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxUploaderModule } from 'ngx-uploader';
import { RouterModule } from '@angular/router';
import { UpdateCustomerComponent } from './update-customer/update-customer.component';
import { CustomerLogoUploaderComponent } from './customer-logo-uploader/customer-logo-uploader.component';
import { CustomerSelectorComponent } from './customer-selector/customer-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CustomerService } from './customer.service';



@NgModule({
  declarations: [
    CustomerBadgeComponent, 
    CustomerListComponent, 
    AddCustomerComponent, UpdateCustomerComponent, CustomerLogoUploaderComponent, CustomerSelectorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxUploaderModule,
    NgSelectModule
  ],
  exports:[
    CustomerBadgeComponent, 
    CustomerListComponent, 
    AddCustomerComponent,
    CustomerSelectorComponent
  ],
  providers:[CustomerService]
})
export class CustomerModule { }
