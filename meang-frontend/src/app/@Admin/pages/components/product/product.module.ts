import { SharedModule } from './../../../../@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';


@NgModule({
  declarations: [ListProductComponent, CreateUpdateProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ]
})
export class ProductModule { }
