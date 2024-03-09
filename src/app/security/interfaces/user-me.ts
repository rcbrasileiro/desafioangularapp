import { CarForm } from './../../interfaces/car-form';
export interface UserMe {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  login: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
  cars: CarForm[]
}
