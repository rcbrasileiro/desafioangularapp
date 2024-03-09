import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  @Output() carAdded: EventEmitter<any> = new EventEmitter();

  @Input() embbed: boolean = false;

  carForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.buildCarForm();
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      // Aqui você pode enviar os dados do carro para o backend
      console.log('Dados do carro:', this.carForm.value);
      // Resetar o formulário após o envio bem-sucedido
      this.carForm.reset();
    } else {
      // Tratar o formulário inválido
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
      year: new FormControl(null, [Validators.required, Validators.min(1930), Validators.max(this.carMaxYear())]),
      licensePlate: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
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
}