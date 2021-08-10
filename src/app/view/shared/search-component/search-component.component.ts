import { Component, OnInit } from '@angular/core';
import { ProductComponents } from 'src/app/model/product/product.component';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTable } from '@angular/material/table';

import { CategorysService } from 'src/app/services/category/category.services';
import { ProductsService } from 'src/app/services/product/product.services.component';
import { ProvidersService } from 'src/app/services/provider/provider.services';
import { CategoryComponents } from 'src/app/model/category/category.component';
import { ProviderComponents } from 'src/app/model/provider/provider.component';

@Component({
  selector: 'app-search-component',
  templateUrl: './search-component.component.html',
  styleUrls: ['./search-component.component.scss'],
  providers: [ProvidersService, ProductsService, CategorysService]
})
export class SearchComponentComponent implements OnInit {
  responseResult!:boolean;
  loading!: boolean;

  table!: MatTable<any>;
  displayedColumns: string[] = ['nome', 'codigo_de_barras', 'preco', 'quantidade', 'categoria', 'fornecedor', 'actions'];
  dataSource!: ProductComponents[];

  formSearch! : FormGroup;
  categorys! : CategoryComponents[];
  providers! : ProviderComponents[];
  products! : ProductComponents[];
  
  forCode! : boolean;
  forName! : boolean;
  forProvider! : boolean;
  forCategory! : boolean;

  receivedMissing: boolean = true;

  constructor(public ProviderService : ProvidersService, public ProductsService: ProductsService, public CategorysService: CategorysService) { 
    this.CategorysService.getCategorys().subscribe((data: CategoryComponents[]) => {
      this.categorys = data;
    });

    this.ProviderService.getProviders().subscribe((data: ProviderComponents[]) => {
      this.providers = data;
    })
    this.createForm(new ProductComponents);
    this.forCode = true;
    this.forCategory = false;
    this.forName = false;
    this.forProvider = false;
 
  }

  ngOnInit(): void {
    this.loading = true;
    this.responseResult = false;
    if(this.formSearch.value.quantidade == 1){
      this.ProductsService.getProducts().subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.products = data;
        this.fillTable(1);
      })
    }
  }

  createForm(produto : ProductComponents){
    produto.quantidade = 1;
    this.formSearch = new FormGroup({
      codigo_de_barras: new FormControl(produto.codigo_de_barras),
      categoria_id: new FormControl(produto.categoria_id),
      nome: new FormControl(produto.nome),
      fornecedor_id: new FormControl(produto.fornecedor_id),
      quantidade: new FormControl(produto.quantidade)
    });
  }

  onRadio(){
    let formaDeBusca = this.formSearch.value.quantidade;
    this.forCode = false;
    this.forCategory = false;
    this.forName = false;
    this.forProvider = false;

    if(formaDeBusca == 1){
      this.forCode = true;
    }else if(formaDeBusca==2){
      this.forName = true;
    }else if(formaDeBusca==3){
      this.forProvider = true;
    }else if(formaDeBusca==4){
      this.forCategory = true;
    }
  }

  clickButtonReset(){
    this.fillTable(1);
  }

  onSubmit(){
    this.loading = true;
    this.responseResult = true;
    if(this.formSearch.value.quantidade == 1){
      this.ProductsService.getProductsWithCode(this.formSearch.value.codigo_de_barras).subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.fillTable(0);
      })
    }else if(this.formSearch.value.quantidade == 2){
      this.ProductsService.getProductsWithName(this.formSearch.value.nome).subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.fillTable(0);
      })
      
    }else if(this.formSearch.value.quantidade == 3){
      this.ProductsService.getProductsWithProvider(this.formSearch.value.fornecedor_id).subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.fillTable(0);
      })
    }else{
      this.ProductsService.getProductsWithCategory(this.formSearch.value.categoria_id).subscribe((data: ProductComponents[])=>{
        this.dataSource = data;
        this.fillTable(0);
      })
    }
    
  }

  fillTable(opcao : number){
    this.loading = false;
    if(this.dataSource.length <= 0){
      this.receivedMissing = false;
    }else{
      this.receivedMissing = true;
    }

    if(opcao == 1){
      this.dataSource = this.products;
    }

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
