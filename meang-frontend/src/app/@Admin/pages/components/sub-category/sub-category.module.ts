import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../../../@Shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { ListSubCategoryComponent } from './list-sub-category/list-sub-category.component';
import { CreateUpdateSubCategoryComponent } from './create-update-sub-category/create-update-sub-category.component';

@NgModule({
  declarations: [ListSubCategoryComponent, CreateUpdateSubCategoryComponent],
  imports: [CommonModule, SubCategoryRoutingModule, SharedModule, FormsModule],
})
export class SubCategoryModule {}
