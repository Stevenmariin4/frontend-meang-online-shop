import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@Service/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./components/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./components/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./components/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'sub-category',
        loadChildren: () =>
          import('./components/sub-category/sub-category.module').then(
            (m) => m.SubCategoryModule
          ),
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('./components/promotions/promotions.module').then(
            (m) => m.PromotionsModule
          ),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./components/product/product.module').then(
            (m) => m.ProductModule
          ),
      },
      {
        path: 'colors',
        loadChildren: () =>
          import('./components/colors/colors.module').then(
            (m) => m.ColorsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
