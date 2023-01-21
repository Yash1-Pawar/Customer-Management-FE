import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedin: boolean = localStorage.getItem('token') == null ? false : true;

  constructor() { }

  ngOnInit(): void {
  }

  toasts() {
    const toastLiveExample = document.getElementById('displayToast') as HTMLElement;
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show();
  }

}
