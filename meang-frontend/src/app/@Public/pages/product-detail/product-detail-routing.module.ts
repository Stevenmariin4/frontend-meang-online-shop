import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductFilterComponent } from './components/product-filter/product-filter.component';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'all',
    component: ProductFilterComponent,
  },
  {
    path: 'all/:id',
    component: ProductFilterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductDetailRoutingModule {}
