import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarForm } from 'src/app/interfaces/car-form';
import { UserForm } from 'src/app/interfaces/user-form';
import { UserResult } from 'src/app/interfaces/user-result';
import { NotificationService } from 'src/app/services/notification.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  @Input() userResult: UserResult = null;

  userForm: FormGroup;

  cars: CarForm[] = [];

  constructor(private userService: UserService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.findById();
    this.buildUserForm();
  }

  buildUserForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.userResult?.firstName, [Validators.required]),
      lastName: new FormControl(this.userResult?.lastName, [Validators.required]),
      email: new FormControl(this.userResult?.email, [Validators.required, Validators.email]),
      birthday: new FormControl(this.userResult?.birthday, [Validators.required, this.birthdayValidator()]),
      login: new FormControl(this.userResult?.login, [Validators.required]),
      password: new FormControl('', [Validators.required]),
      phone: new FormControl(this.userResult?.phone, [Validators.required]),
    });

    if (this.userResult) {
      this.cars = this.userResult.cars;
    }
  }

  onSubmit(): void {
    this.userForm.markAllAsTouched();
    if (this.userForm.valid) {
      const formData: UserForm = this.userForm.value;
      if (!this.isDate(formData.birthday)) {
        formData.birthday = new Date(formData.birthday + ' 00:00:00');
      }

      formData.cars = this.cars;

      debugger;
      if (this.isEditable()) {
        this.userService.update(formData, this.userResult.id).subscribe({
          next: (response) => {
            this.router.navigate(['/user-list']);
          },
          error: (error) => this.errorHandle(error),
          complete: () => {
            this.notificationService.showSuccess('Usuário atualizado!', 'Sucesso');
          },
        })

      } else {
        this.userService.save(formData).subscribe({
          next: (response) => {
            this.router.navigate(['/user-list']);
          },
          error: (error) => this.errorHandle(error),
          complete: () => {
            this.notificationService.showSuccess('Usuário adicionado!', 'Sucesso');
          },
        });
      }
    }
  }

  findById(): void {
    const userId = this.route.snapshot.paramMap.get('id');

    if (userId == null) {
      return;
    }

    const userIdNumber = parseInt(userId, 10);
    if (!isNaN(userIdNumber)) {
      this.userService.getUserById(userIdNumber).subscribe({
        next: (response) => {
          this.userResult = response;
          this.buildUserForm();
        },
        error: (error) => this.errorHandle(error)
      });
    } else {
      this.notificationService.showError('Id inválido', 'Erro');
      this.router.navigate(['/user-list']);
    }
  }

  isDate(value: any): boolean {
    return value instanceof Date;
  }

  errorHandle(error: any): void {
    debugger;
    switch (error.status) {
      case 400:
      case 422:
      case 409: {
        this.notificationService.showWarning(error.error.message, 'Aviso');
        break;
      }
      case 404: {
        this.notificationService.showInfo('Usuário não encontrado', 'Aviso');
        this.router.navigate(['/user-list']);
        break;
      }
      default:
        this.notificationService.showError('Ocorreu um erro inesperado!', 'Erro');
    }
  }

  limpar(): void {
    this.userForm.reset();
  }

  isInvalidAndTouched(fieldName: string): boolean {
    const control = this.userForm.get(fieldName);
    return control.invalid && control.touched;
  }

  handleCarAdded(newCar: CarForm): void {
    const isDuplicate = this.cars.some(car => car.licensePlate === newCar.licensePlate);
    if (isDuplicate) {
      this.notificationService.showError('A placa já foi adicionada', 'Error');
    } else {
      this.cars.push(newCar);
    }
  }

  removeCar(car: CarForm): void {
    const index = this.cars.indexOf(car);
    if (index !== -1) {
      this.cars.splice(index, 1);
    }
  }

  birthdayValidator(): any {
    return (control: FormControl) => {
      const birthday = new Date(control.value + ' 00:00:00');
      const currentDate = new Date();
      return birthday < currentDate ? null : { birthdayInvalid: true };
    };
  }

  saveOrEdit(): string {
    return this.userResult ? 'Editar' : 'Salvar';
  }

  isEditable(): boolean {
    return this.userResult != null;
  }

}
