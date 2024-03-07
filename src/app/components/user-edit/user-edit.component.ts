import { NotificationService } from 'src/app/services/notification.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResult } from 'src/app/interfaces/user-result';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CarForm } from 'src/app/interfaces/car-form';
import { UserForm } from 'src/app/interfaces/user-form';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userResult: UserResult;

  constructor(private userService: UserService, private notificationService: NotificationService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.findById();
  }

  findById(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const userIdNumber = parseInt(userId, 10);
    if (!isNaN(userIdNumber)) {
      this.userService.getUserById(userIdNumber).subscribe({
        next: (response) => {
          debugger;
          this.userResult = response;
        },
        error: (error) => this.errorHandle(error)
      });
    } else {
      this.notificationService.showError('Id inválido', 'Erro');
    }
  }

  errorHandle(error: any): void {
    switch (error.status) {
      case 404: {
        this.notificationService.showInfo('Usuário não encontrado', 'Aviso');
        this.router.navigate(['/user-list']);
        break;
      }
      default:
        this.notificationService.showError('Ocorreu um erro inesperado!', 'Erro');
        this.router.navigate(['/user-list']);
    }
  }

}
