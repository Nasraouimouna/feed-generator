import { Injectable } from '@angular/core';
import { ICustomer } from '../models/customer.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IApiResponse } from '../models/api-response.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private httpClient:HttpClient) { }

  postCustomer(customer:ICustomer):Observable<IApiResponse>{
      return this.httpClient.post(`${environment.API_URL}/api/v1/customers/add`,customer) as Observable<IApiResponse>;
  }

  deleteCustomer(id){
    return this.httpClient.delete(`${environment.API_URL}/api/v1/customers/delete/${id}`) as Observable<IApiResponse>;;
  }


  updateCustomer(id,customer):Observable<IApiResponse>{
     let _customer={...customer};
    return this.httpClient.put(`${environment.API_URL}/api/v1/customers/update/${id}`,_customer) as Observable<IApiResponse>;
  }

  getAllCustomers(){
    return this.httpClient.get(`${environment.API_URL}/api/v1/customers`) as Observable<IApiResponse>;
  }

  getCustomerById(id){
    return this.httpClient.get(`${environment.API_URL}/api/v1/customers/${id}`) as Observable<IApiResponse>;
  }
}
