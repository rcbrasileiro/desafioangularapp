import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';

const routes: Routes = [
  {path: 'user-list', component: UserListComponent, data: { breadcrumb: 'Listagem de usuários' }},
  {path: 'user-form', component: UserFormComponent, data: { breadcrumb: 'Adicionar usuário' }},
  {path: 'user-form/:id', component: UserFormComponent, data: { breadcrumb: 'Editar usuário' }},

  {path: 'car-list', component: CarListComponent, data: { breadcrumb: 'Listagem de carros' }},
  {path: 'car-form', component: CarFormComponent, data: { breadcrumb: 'Adicionar carro' }},
  {path: 'car-form/:id', component: CarFormComponent, data: { breadcrumb: 'Editar carro' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
