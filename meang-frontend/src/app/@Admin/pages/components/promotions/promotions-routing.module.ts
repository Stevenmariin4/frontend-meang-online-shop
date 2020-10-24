import { ListPromotionsComponent } from './list-promotions/list-promotions.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUpdatePromotionsComponent } from './create-update-promotions/create-update-promotions.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListPromotionsComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdatePromotionsComponent,
  },
  {
    path: 'create',
    component: CreateUpdatePromotionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromotionsRoutingModule {}
