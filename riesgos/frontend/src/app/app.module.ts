import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { MapComponent } from './components/map/map.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ActionComponent } from './components/action/action.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ActionListComponent,
    MapComponent,
    ProductListComponent,
    ActionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
