import { Component, OnInit, Output } from '@angular/core';
import { HostListener } from "@angular/core";

import { CategoryComponents } from 'src/app/model/category/category.component';
import { ProviderComponents } from 'src/app/model/provider/provider.component';
import { CategorysService } from 'src/app/services/category/category.services';
import { ProductsService } from 'src/app/services/product/product.services.component';
import { ProvidersService } from 'src/app/services/provider/provider.services';


@Component({
  selector: 'app-panel-initial',
  templateUrl: './panel-initial.component.html',
  styleUrls: ['./panel-initial.component.scss'],
  providers: [ProvidersService, ProductsService, CategorysService]
})

export class PanelInitialComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  sizeMenu!: number;
  sizeCenter!: number;

  background_item_1: string = "background_item";
  background_item_2: string = "";
  background_item_3: string = "";
  background_item_4: string = "";
  
  categorys! : CategoryComponents[];
  providers! : ProviderComponents[];
  opcao1: number = 1;
  opcao2: number = 2;
  opcao3: number = 3;

  vHome : boolean = true;
  vProductMissing : boolean = false;
  vProductCategory : boolean = false;
  vProductProvider : boolean = false;

  constructor(public ProviderService : ProvidersService, public ProductsService: ProductsService, public CategorysService: CategorysService) { 
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize() {
          this.screenHeight = window.innerHeight;
          this.screenWidth = window.innerWidth;
          this.sizeCenter = this.screenWidth-300;
          this.sizeMenu = this.screenHeight+28;
  }

  ngOnInit(): void {
    
  }
  
  onHome(){
    this.resetBg();
    this.vHome = true;
    this.background_item_1 = "background_item";
  }

  onProductMissing(){
    this.resetBg();
    this.vProductMissing = true;
    this.background_item_2 = "background_item";
  }

  onProductCategory(){
    this.resetBg();
    this.vProductCategory = true;
    this.background_item_3 = "background_item";
  }

  onProductProvider(){
    this.resetBg();
    this.vProductProvider = true;
    this.background_item_4 = "background_item";
  }

  resetBg(){
    this.vHome = false;
    this.vProductMissing = false;
    this.vProductCategory = false;
    this.vProductProvider = false;

    this.background_item_1 = "";
    this.background_item_2 = "";
    this.background_item_3 = "";
    this.background_item_4 = "";
  }

}
