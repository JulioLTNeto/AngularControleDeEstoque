import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryComponents } from 'src/app/model/category/category.component';

@Injectable()
export class CategorysService {
    elementApiUrl = "http://localhost:21262/getCategorias";
    elementApiUrlCreate = "http://localhost:21262/addCategoria";
    elementApiUrlUpdate = "http://localhost:21262/updateCategoria";
    elementApiUrlDelete = "http://localhost:21262/deleteCategoria";

  constructor(private http: HttpClient) { }
  getCategorys() : Observable<CategoryComponents[]>{
    return this.http.get<CategoryComponents[]>(this.elementApiUrl);
  }

  createCategory(element: CategoryComponents): Observable<CategoryComponents[]>{
    return this.http.post<CategoryComponents[]>(this.elementApiUrlCreate, element);
  }

  updateCategory(element: CategoryComponents): Observable<CategoryComponents>{
    return this.http.put<CategoryComponents>(this.elementApiUrlUpdate, element);
  }

  deleteCategory(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}${id}`);
  }
}