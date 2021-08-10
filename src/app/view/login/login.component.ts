import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UsersComponents } from 'src/app/model/user/users.components';
import {MatDialog} from '@angular/material/dialog';
import { UserServices } from 'src/app/services/user/user.services';
import { IncorrectLoginDialogComponent } from '../shared/dialogs/incorrect-login-dialog/incorrect-login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserServices]
})
export class LoginComponent implements OnInit{
  fillEmail: boolean = true;
  fillPassword: boolean = true;

  loading:boolean = false;

  formLogin!: FormGroup;
  userReturn!: UsersComponents[];

  constructor(public UserServices : UserServices, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createForm(new UsersComponents());
    sessionStorage.setItem('login', "");
    sessionStorage.setItem('password', "");
  }

  createForm(login : UsersComponents){
    this.formLogin = new FormGroup({
      email: new FormControl(login.login),
      password: new FormControl(login.senha)
    })
  }

  onSubmit(){
    if(this.formLogin.value.email == "" || this.formLogin.value.password == 0){
      this.fillEmail = false;
      this.fillPassword = false;
    }else{
      let usuario = new UsersComponents;
      usuario.login = this.formLogin.value.email;
      usuario.senha = this.formLogin.value.password;
      this.loading = true;

      this.UserServices.createLogin(usuario).subscribe((data: UsersComponents[])=>{
        this.loading = false;
        this.userReturn = data;

        if(this.userReturn.length <= 0){
          
          this.dialog.open(IncorrectLoginDialogComponent);
          this.onReset();

        }else{
          sessionStorage.setItem('login', this.formLogin.value.email);
          sessionStorage.setItem('password', this.formLogin.value.password);
          sessionStorage.setItem('nameUser', data[0].nome);
          location.reload();
        }
      });
      
    }
  }

  onReset(){
    let login = new UsersComponents();
    this.formLogin = new FormGroup({
      email: new FormControl(login.login),
      password: new FormControl(login.senha)
    })
  }

}
