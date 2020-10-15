import { ListProductComponent } from './list-product/list-product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdateProductComponent } from './create-update-product/create-update-product.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListProductComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdateProductComponent,
  },
  {
    path: 'create',
    component: CreateUpdateProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
