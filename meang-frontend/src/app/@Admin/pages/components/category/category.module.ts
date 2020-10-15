import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import { CreateUpdateCategoryComponent } from './create-update-category/create-update-category.component';


@NgModule({
  declarations: [ListCategoryComponent, CreateUpdateCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
