import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ListProductComponent } from './list-product/list-product.component';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MaterialModule } from 'src/app/material/material/material.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [ListProductComponent, CreateUpdateProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTabsModule,
  ],
})
export class ProductModule {}
