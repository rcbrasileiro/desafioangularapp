import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { CarFormComponent } from './components/car-form/car-form.component';
import { ForbiddenComponent } from './security/components/forbidden/forbidden.component';
import { LoginComponent } from './security/components/login/login.component';
import { AuthGuard } from './security/guards/auth.guard';
import { HomeComponent } from './home/home/home.component';


const routes: Routes = [
  {path: 'user-list', component: UserListComponent, data: { breadcrumb: 'Listagem de usuários' }},
  {path: 'user-form', component: UserFormComponent, data: { breadcrumb: 'Adicionar usuário' }},
  {path: 'user-form/:id', component: UserFormComponent, data: { breadcrumb: 'Editar usuário' }},
  {path: 'forbidden', component: ForbiddenComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, data: { breadcrumb: 'Página inicial' }},

  {path: 'car-list', component: CarListComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Listagem de carros' }},
  {path: 'car-form', component: CarFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Adicionar carro' }},
  {path: 'car-form/:id', component: CarFormComponent, canActivate: [AuthGuard], data: { breadcrumb: 'Editar carro' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
