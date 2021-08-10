import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductComponents } from 'src/app/model/product/product.component';

@Injectable()
export class ProductsService {
    elementApiUrl = "http://localhost:21262/getProdutos";
    elementApiUrlGetMissing = "http://localhost:21262/getProdutosFaltando";
    elementApiUrlGetWithCode = "http://localhost:21262/getProdutosPorCodigo/";
    elementApiUrlGetWithName = "http://localhost:21262/getProdutosPorNome/";
    elementApiUrlGetWithProvider = "http://localhost:21262/getProdutosPorFornecedor/";
    elementApiUrlGetWithCategory = "http://localhost:21262/getProdutosPorCategoria/";
    elementApiUrlCreate = "http://localhost:21262/addProduto";
    elementApiUrlUpdate = "http://localhost:21262/updateProduto";
    elementApiUrlDelete = "http://localhost:21262/deleteProduto";

  constructor(private http: HttpClient) { }
  getProducts() : Observable<ProductComponents[]>{
    return this.http.get<ProductComponents[]>(this.elementApiUrl);
  }

  getProductsMissing(): Observable<ProductComponents[]>{
    return this.http.get<ProductComponents[]>(this.elementApiUrlGetMissing);
  }

  getProductsWithCode(codigo_de_barras: string): Observable<ProductComponents[]>{
    return this.http.get<any>(`${this.elementApiUrlGetWithCode}${codigo_de_barras}`);
  }

  getProductsWithName(value: string): Observable<ProductComponents[]>{
    return this.http.get<any>(`${this.elementApiUrlGetWithName}${value}`);
  }

  getProductsWithProvider(value: string): Observable<ProductComponents[]>{
    return this.http.get<any>(`${this.elementApiUrlGetWithProvider}${value}`);
  }

  getProductsWithCategory(value: string): Observable<ProductComponents[]>{
    return this.http.get<any>(`${this.elementApiUrlGetWithCategory}${value}`);
  }

  createProduct(element: ProductComponents): Observable<ProductComponents[]>{
    return this.http.post<ProductComponents[]>(this.elementApiUrlCreate, element);
  }

  updateProduct(element: ProductComponents): Observable<ProductComponents>{
    return this.http.put<ProductComponents>(this.elementApiUrlUpdate, element);
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}${id}`);
  }
}