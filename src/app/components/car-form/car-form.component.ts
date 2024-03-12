import { CarService } from './../../services/car.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { debounce } from 'rxjs';
import { CarForm } from 'src/app/interfaces/car-form';
import { CarResult } from 'src/app/interfaces/car-result';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Output() carAdded: EventEmitter<any> = new EventEmitter();

  @Input() embbed: boolean = false;

  @Input() carResult: CarResult = null;

  carForm: FormGroup;

  maxYear: number;

  constructor(private carService: CarService, private notificationService: NotificationService, private router: Router, private route: ActivatedRoute, private translate: TranslateService) { }

  ngOnInit(): void {
    if(!this.embbed) {
      this.findById();
    }

    this.buildCarForm();
    this.maxYear = this.carMaxYear();
  }

  onSubmit(): void {
    this.carForm.markAllAsTouched();
    if (this.carForm.valid) {
      const formData: CarForm = this.carForm.value;

      if (this.isEditable()) {
        this.update(formData);

      } else {
        this.save(formData);
      }
    }
  }

  private save(formData: CarForm) {
    this.carService.save(formData).subscribe({
      next: (response) => {
        this.router.navigate(['/car-list']);
        this.notificationService.showSuccess(this.translate.instant('car.added'), this.translate.instant('common.success'));
      },
      error: (error) => {
        this.errorHandle(error);
      },
    });
  }

  private update(formData: CarForm) {
    this.carService.update(formData, this.carResult.id).subscribe({
      next: (response) => {
        this.router.navigate(['/car-list']);
        this.notificationService.showSuccess(this.translate.instant('common.updated'), this.translate.instant('common.success'));
      },
      error: (error) => this.errorHandle(error),
    });
  }

  findById(): void {
    const carId = this.route.snapshot.paramMap.get('id');

    if (carId == null) {
      return;
    }

    const carIdNumber = parseInt(carId, 10);
    if (!isNaN(carIdNumber)) {
      this.carService.getUserById(carIdNumber).subscribe({
        next: (response) => {
          this.carResult = response;
          this.buildCarForm();
        },
        error: (error) => this.errorHandle(error)
      });
    } else {
      this.notificationService.showError(this.translate.instant('common.invalidId'), this.translate.instant('common.error'));
      this.router.navigate(['/car-list']);
    }
  }

  errorHandle(error: any): void {
    switch (error.status) {
      case 400:
      case 422:
      case 409: {
        this.notificationService.showWarning(this.translate.instant(error.error.message), this.translate.instant('common.warning'));
        break;
      }
      case 404: {
        this.notificationService.showInfo(this.translate.instant('car.notFound'), this.translate.instant('common.warning'));
        this.router.navigate(['/car-list']);
        break;
      }
      default:
        this.notificationService.showError(this.translate.instant('common.unexpectedError'), this.translate.instant('common.error'));
    }
  }

  isInvalidAndTouched(fieldName: string): boolean {
    const control = this.carForm.get(fieldName);
    return control.invalid && control.touched;
  }

  clear(): void {
    this.carForm.reset();
  }

  addCar() {
    this.carForm.markAllAsTouched();
    if (this.carForm.valid) {
      const newCar = this.carForm.value;
      this.carAdded.emit(newCar);
      this.carForm.reset();
    }
  }

  buildCarForm(): void {
    this.carForm = new FormGroup({
      year: new FormControl(this.carResult?.year, [Validators.required, Validators.min(1930), Validators.max(this.carMaxYear())]),
      licensePlate: new FormControl(this.carResult?.licensePlate, [Validators.required]),
      model: new FormControl(this.carResult?.model, [Validators.required]),
      color: new FormControl(this.carResult?.color, [Validators.required]),
    });
  }

  carMaxYear(): number {
    return new Date().getFullYear() + 1;
  }

  transformToUppercase(event: any) {
    const value = event.target.value;
    event.target.value = value.toUpperCase();
  }

  restrictToLetters(event: any) {
    const value = event.target.value;
    event.target.value = value.replace(/[^a-zA-Z]/g, '');
  }

  saveOrEdit(): string {
    return this.carResult ? this.translate.instant('common.edit') : this.translate.instant('common.save');
  }

  isEditable(): boolean {
    return this.carResult != null;
  }
}
