import { Component, OnInit } from '@angular/core';

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

}
