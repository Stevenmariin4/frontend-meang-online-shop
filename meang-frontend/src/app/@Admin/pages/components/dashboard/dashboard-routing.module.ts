import { ViewFacturesComponent } from './view-factures/view-factures.component';
import { ListFacturesComponent } from './list-factures/list-factures.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: ListFacturesComponent,
  },
  {
    path: 'view/:id',
    component: ViewFacturesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
