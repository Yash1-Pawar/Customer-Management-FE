import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './model/Cutomer';
import { Login } from './model/Login';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = "http://localhost:8080/customerApp/";

  private baseUrlForAuth: string = "http://localhost:8080/jwt/";

  options = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  }

  login(login: Login): Observable<any> {
    return this.httpClient.post(this.baseUrlForAuth + "getToken", login);
  }

  getAllCustomers(): Observable<any> {
    console.log(this.options)
    return this.httpClient.get(this.baseUrl + "getAllCustomers", {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    });
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
