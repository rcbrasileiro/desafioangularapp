import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent, data: { breadcrumb: 'Listagem de usuários' }},
  {path: 'user-add', component: UserAddComponent, data: { breadcrumb: 'Adicionar usuário' }},
  {path: 'user-edit/:id', component: UserEditComponent, data: { breadcrumb: 'Editar usuário' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
