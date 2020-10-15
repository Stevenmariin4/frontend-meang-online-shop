import { ListCategoryComponent } from './list-category/list-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateCategoryComponent } from './create-update-category/create-update-category.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListCategoryComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdateCategoryComponent,
  },
  {
    path: 'create',
    component: CreateUpdateCategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
