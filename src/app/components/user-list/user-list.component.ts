import { NotificationService } from './../../services/notification.service';
import { UserResult } from 'src/app/interfaces/user-result';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: UserResult[] = [];

  constructor(private userService: UserService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.list().subscribe(response => {
      this.users = response.content;
    });
  }

  addUser(): void {
    this.router.navigate(['/user-add']);
  }

  editUser(id: number): void {
    this.router.navigate(['/user-add', id]);
  }

  deleteUser(userId: number): void {
    this.userService.delete(userId).subscribe({
      next: () => {
        this.getUsers();
        this.notificationService.showSuccess('Usuário excluído!', 'Sucesso');
      },
      error: (error) => {
        this.notificationService.showError(error.error.message, 'Erro');
      }
    });
  }

}
