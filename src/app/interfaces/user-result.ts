import { CarForm } from "./car-form";

export interface UserResult {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  login: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
  cars: CarForm[];
}
