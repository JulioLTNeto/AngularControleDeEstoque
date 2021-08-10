import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  fezLogin: boolean = false;

  constructor() {
    var login = sessionStorage.getItem('login');
    var password = sessionStorage.getItem('password');
    //sessionStorage.clear();
    if(login != "" && login != null){
      this.fezLogin = true;
    }
   }

  ngOnInit(): void {
  }

}
