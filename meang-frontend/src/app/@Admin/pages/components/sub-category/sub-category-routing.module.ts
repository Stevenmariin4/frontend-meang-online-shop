import { ListSubCategoryComponent } from './list-sub-category/list-sub-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateSubCategoryComponent } from './create-update-sub-category/create-update-sub-category.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListSubCategoryComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdateSubCategoryComponent,
  },
  {
    path: 'create',
    component: CreateUpdateSubCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubCategoryRoutingModule {}
