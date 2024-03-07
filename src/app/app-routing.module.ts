import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent, data: { breadcrumb: 'Listagem de usuários' }},
  {path: 'user-form', component: UserFormComponent, data: { breadcrumb: 'Adicionar usuário' }},
  {path: 'user-form/:id', component: UserFormComponent, data: { breadcrumb: 'Editar usuário' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
