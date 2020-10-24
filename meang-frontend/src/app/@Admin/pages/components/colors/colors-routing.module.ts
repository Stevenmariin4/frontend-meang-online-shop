import { CreateUpdateColorsComponent } from './create-update-colors/create-update-colors.component';
import { ListColorsComponent } from './list-colors/list-colors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'list',
    component: ListColorsComponent,
  },
  {
    path: 'update/:id',
    component: CreateUpdateColorsComponent,
  },
  {
    path: 'create',
    component: CreateUpdateColorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorsRoutingModule {}
