import { Component, OnChanges } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  
  toastMessage?: string = 'This is toast from app-component';
  toastBgc?:string;

  showToast() {
    const toastLiveExample = document.getElementById('displayToast') as HTMLElement;
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show();
  }
}

