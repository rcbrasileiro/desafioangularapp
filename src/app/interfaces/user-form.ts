import { CarForm } from "./car-form";

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  birthday: Date;
  login: string;
  password: string;
  phone: string;
  cars: CarForm[];
}
