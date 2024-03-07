import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly notificationPosition = 'toast-top-right';

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string) {
    this.toastr.success(message, title, {
      positionClass: this.notificationPosition,
      timeOut: 10000,
      progressBar: true,
    });
  }

  showError(message:string, title: string) {
    this.toastr.error(message, title, {
      positionClass: this.notificationPosition,
      timeOut: 10000,
      progressBar: true,
    });
  }

  showInfo(message: string, title: string) {
    this.toastr.info(message, title, {
      positionClass: this.notificationPosition,
      timeOut: 10000,
      progressBar: true,
    });
  }

  showWarning(message: string, title: string) {
    this.toastr.warning(message, title, {
      positionClass: this.notificationPosition,
      timeOut: 10000,
      progressBar: true,
    });
  }
}
