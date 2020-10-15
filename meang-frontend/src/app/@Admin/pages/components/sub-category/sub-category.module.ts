import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { ListSubCategoryComponent } from './list-sub-category/list-sub-category.component';


@NgModule({
  declarations: [ListSubCategoryComponent],
  imports: [
    CommonModule,
    SubCategoryRoutingModule
  ]
})
export class SubCategoryModule { }
