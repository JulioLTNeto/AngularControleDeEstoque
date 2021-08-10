import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProviderComponents } from 'src/app/model/provider/provider.component'

@Injectable()
export class ProvidersService {
    elementApiUrl = "http://localhost:21262/getFornecedores";
    elementApiUrlCreate = "http://localhost:21262/addFornecedor";
    elementApiUrlUpdate = "http://localhost:21262/updateFornecedor";
    elementApiUrlDelete = "http://localhost:21262/deleteFornecedor";

  constructor(private http: HttpClient) { }
  
  getProviders() : Observable<ProviderComponents[]>{
    return this.http.get<ProviderComponents[]>(this.elementApiUrl);
  }

  createProvider(element: ProviderComponents): Observable<ProviderComponents[]>{
    return this.http.post<ProviderComponents[]>(this.elementApiUrlCreate, element);
  }

  updateProvider(element: ProviderComponents): Observable<ProviderComponents>{
    return this.http.put<ProviderComponents>(this.elementApiUrlUpdate, element);
  }

  deleteProvider(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}${id}`);
  }
}