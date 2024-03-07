import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarResult } from 'src/app/interfaces/car-result';
import { CarService } from 'src/app/services/car.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css']
})
export class CarListComponent implements OnInit {

  cars: CarResult[] = [];

  constructor(private carService: CarService, private notificationService: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(): void {
    this.carService.list().subscribe(response => {
      this.cars = response.content;
    });
  }

  addCar(): void {
    this.router.navigate(['/car-form']);
  }

  editCar(id: number): void {
    this.router.navigate(['/car-form', id]);
  }

  deleteCar(userId: number): void {
    this.carService.delete(userId).subscribe({
      next: () => {
        this.getCars();
        this.notificationService.showSuccess('Carro excluído!', 'Sucesso');
      },
      error: (error) => {
        this.notificationService.showError(error.error.message, 'Erro');
      }
    });
  }
}
