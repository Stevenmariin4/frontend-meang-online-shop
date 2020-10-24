import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [ProductDetailComponent, ProductFilterComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    MatPaginatorModule
  ]
})
export class ProductDetailModule { }
