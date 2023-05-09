import { CityType } from './city';
import { Customer } from './customer.interface';
import { Executor } from './executor.interface';
import {UserRole} from './user-role.enum';

export interface User extends Customer, Executor{
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  city: CityType;
  info?: string;
  specialties?: string[];
}