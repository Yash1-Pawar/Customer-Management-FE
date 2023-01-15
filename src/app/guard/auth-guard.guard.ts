import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  isLoggedIn?:boolean;

  canActivate(): boolean {
    this.isLoggedIn = localStorage.getItem('token') == null ? false : true;
    return localStorage.getItem('token') == null ? false : true;
  }
  
}
