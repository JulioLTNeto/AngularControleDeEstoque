import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsersComponents } from 'src/app/model/user/users.components';

@Injectable()
export class UserServices {
    elementApiUrl = "http://localhost:21262/getUsuarios";
    elementApiUrlLogin = "http://localhost:21262/loginUsuario";
    elementApiUrlCreate = "http://localhost:21262/addUsuario";
    elementApiUrlUpdate = "http://localhost:21262/updateUsuario";
    elementApiUrlDelete = "http://localhost:21262/deleteUsuario";

  constructor(private http: HttpClient) { }
  
  getUsers() : Observable<UsersComponents[]>{
    return this.http.get<UsersComponents[]>(this.elementApiUrl);
  }

  createLogin(element: UsersComponents) : Observable<UsersComponents[]>{
    return this.http.post<UsersComponents[]>(this.elementApiUrlLogin, element);
  }

  createUser(element: UsersComponents): Observable<UsersComponents[]>{
    return this.http.post<UsersComponents[]>(this.elementApiUrlCreate, element);
  }

  updateUser(element: UsersComponents): Observable<UsersComponents>{
    return this.http.put<UsersComponents>(this.elementApiUrlUpdate, element);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${this.elementApiUrl}${id}`);
  }
}