import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from './model/Cutomer';
import { Login } from './model/Login';
import { ResetPassword } from './model/ResetPassword';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl: string = "http://localhost:8080/customerApp/";

  private baseUrlForAuth: string = "http://localhost:8080/jwt/";

  login(login: Login): Observable<any> {
    return this.httpClient.post(this.baseUrlForAuth + "getToken", login);
  }

  // register
  addCustomer(customer: Customer): Observable<any> {
    console.log(customer)
    return this.httpClient.post(this.baseUrlForAuth + "registerUser", customer);
  }

  getAllCustomers(): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    console.log(localStorage.getItem('token'))
    return this.httpClient.get(this.baseUrl + "getAllCustomers", options);
  }

  deleteCustomer(id: number): Observable<any> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        responseType: 'text' as 'json'
      })
    }
    return this.httpClient.delete(this.baseUrl + "deleteCustomer/" + id, options);
  }

  updateCustomer(customer: Customer): Observable<any> {
    let options =
    {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      responseType: 'text' as 'json'
    }
    return this.httpClient.put(this.baseUrl + "updateCustomer/" + customer.id, customer, options);
  }

  getCustomerById(id: string): Observable<Customer> {
    let options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    }
    return this.httpClient.get<Customer>(this.baseUrl + "getCustomer/" + id, options);
  }

  changePassword(id: string, resetDTO: ResetPassword): Observable<any> {
    let options =
    {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      responseType: 'text' as 'json'
    }
    return this.httpClient.put(this.baseUrl + "changePassword/" + id, resetDTO, options);
  }

  forgotPassword(id: string, newPassword: string): Observable<any> {
    let options =
    {
      responseType: 'text' as 'json'
    }
    return this.httpClient.put(this.baseUrlForAuth + "resetPassword/" + id, newPassword, options);
  }

  follow(id: string, followingId: string): Observable<any> {
    let options =
    {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      responseType: 'text' as 'json'
    }
    return this.httpClient.put(this.baseUrl + "follow/" + id, followingId, options);
  }

  unfollow(id: string, followerId: string): Observable<any> {
    let options =
    {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }),
      responseType: 'text' as 'json'
    }
    return this.httpClient.put(this.baseUrl + "unfollow/" + id, followerId, options);
  }

}
