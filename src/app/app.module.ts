import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './view/home/home.component';
import { FormProductComponent } from './view/shared/form-product/form-product.component';
import { TableProductMissingComponent } from './view/shared/table-product-missing/table-product-missing.component';
import { HeaderComponent } from './view/shared/header/header.component';
import { FooterComponent } from './view/shared/footer/footer.component';
import { SearchComponentComponent } from './view/shared/search-component/search-component.component';
import { LoginComponent } from './view/login/login.component';
import { PanelInitialComponent } from './view/panel-initial/panel-initial.component';
import { TableProductCategoryComponent } from './view/shared/table-product-category/table-product-category.component';
import { TableProductProviderComponent } from './view/shared/table-product-provider/table-product-provider.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FormProductComponent,
    TableProductMissingComponent,
    HeaderComponent,
    FooterComponent,
    SearchComponentComponent,
    LoginComponent,
    PanelInitialComponent,
    TableProductCategoryComponent,
    TableProductProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    MatDividerModule,
    MatProgressBarModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
