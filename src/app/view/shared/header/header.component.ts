import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  sizeMenu!: number;
  sizeCenter!: number;
  nameUser = sessionStorage.getItem('nameUser');
  
  constructor() { 
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize() {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          this.sizeCenter = this.screenWidth-300;
  }

  ngOnInit(): void {
  }

}
