import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { ProductComponents } from 'src/app/model/product/product.component';
import { CategorysService } from 'src/app/services/category/category.services';
import { ProductsService } from 'src/app/services/product/product.services.component';
import { ProvidersService } from 'src/app/services/provider/provider.services';
import { CategoryComponents } from 'src/app/model/category/category.component';
import { ProviderComponents } from 'src/app/model/provider/provider.component';


@Component({
  selector: 'app-table-product-missing',
  templateUrl: './table-product-missing.component.html',
  styleUrls: ['./table-product-missing.component.scss'],
  providers: [ProvidersService, ProductsService, CategorysService]
})
export class TableProductMissingComponent implements OnInit {
  receivedMissing: boolean = true;

  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'codigo_de_barras', 'preco', 'quantidade', 'categoria', 'fornecedor', 'actions'];
  dataSource!: ProductComponents[];

  formSearch! : FormGroup;

  categorys! : CategoryComponents[];
  providers! : ProviderComponents[];

  @Input() dadoOpcao! : number;

  constructor(public ProviderService : ProvidersService, public ProductsService: ProductsService, public CategorysService: CategorysService) { 
    
  }

  ngOnInit(): void {
    
    this.CategorysService.getCategorys().subscribe((data: CategoryComponents[]) => {
      this.categorys = data;
    });
  
    this.ProviderService.getProviders().subscribe((data: ProviderComponents[]) => {
      this.providers = data;
    });
    if(this.dadoOpcao == 1){
      this.ProductsService.getProductsMissing().subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.fillTable();
        if(this.dataSource.length <= 0){
          this.receivedMissing = false;
        }
      });
    }else if(this.dadoOpcao == 2){

    }else if(this.dadoOpcao == 3){

    }
    
  }


  fillTable(){
    for(var cont = 1; cont <= this.dataSource.length; cont++){
      this.dataSource[cont-1].position = cont;

      for(var cont2 = 0; cont2 < this.categorys.length; cont2++){
        if(this.dataSource[cont-1].categoria_id == this.categorys[cont2].id){
          this.dataSource[cont-1].categoria_nome = this.categorys[cont2].nome;
        }
      }

      for(var cont2 = 0; cont2 < this.providers.length; cont2++){
        if(this.dataSource[cont-1].fornecedor_id == this.providers[cont2].id){
          this.dataSource[cont-1].fornecedor_nome = this.providers[cont2].nome;
        }
      }
      
    }
  }
}
