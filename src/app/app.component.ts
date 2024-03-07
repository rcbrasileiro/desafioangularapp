import { UserAuth } from './interfaces/user-auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Desafio Angular App';

  userAuth: UserAuth = {
    id: 0,
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    birthday: new Date(),
    login: 'login',
    phone: 'phone',
    createdAt: new Date(),
    lastLogin: new Date(),
    token: 'createdAt'
  };

  logout(): void {
    // logout
  }
}
