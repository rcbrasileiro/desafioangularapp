import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRequest } from '../../interfaces/auth-request';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequestForm: FormGroup

  constructor(private authService: AuthService, private notificationService: NotificationService, private router: Router, private translate: TranslateService) { }

  ngOnInit(): void {
    this.buildAuthRequest();
  }

  onSubmit(): void {
    this.authRequestForm.markAllAsTouched();
    if (this.authRequestForm.valid) {
      const formData: AuthRequest = this.authRequestForm.value;
      this.authService.login(formData).subscribe({
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.notificationService.showError(this.translate.instant('login.invalidCredentials'), this.translate.instant('login.authentication'));
          } else {
            this.notificationService.showError(this.translate.instant('login.loginError'), this.translate.instant('common.erro'));
          }
        }
      });
    }
  }


  buildAuthRequest(): void {
    this.authRequestForm = new FormGroup({
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  isInvalidAndTouched(fieldName: string): boolean {
    const control = this.authRequestForm.get(fieldName);
    return control.invalid && control.touched;
  }
}
