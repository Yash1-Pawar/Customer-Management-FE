import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './model/Cutomer';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private baseUrl: string = "http://localhost:8080/customerApp/";

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.httpClient.get<Customer[]>(this.baseUrl + "getAllCustomers");
  }

  addCustomer(customer: Customer): Observable<any> {
    return this.httpClient.post(this.baseUrl + "addCustomer", customer, { responseType: 'text' });
  }

  deleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete(this.baseUrl + "deleteCustomer/" + id, { responseType: 'text' });
  }

  updateCustomer(customer: Customer): Observable<any> {
    return this.httpClient.put(this.baseUrl + "updateCustomer/" + customer.id, customer, { responseType: 'text' });
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.httpClient.get<Customer>(this.baseUrl + "getCustomer/" + id);
  }
}
