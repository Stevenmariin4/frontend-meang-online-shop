import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateUserComponent } from './create-user/create-user.component';
import { ListUsersComponent } from './list-users/list-users.component';

const routes: Routes = [
  {
    path: 'list',
    component: ListUsersComponent,
  },
  {
    path: 'update/:id',
    component: CreateUserComponent,
  },
  {
    path: 'create',
    component: CreateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
