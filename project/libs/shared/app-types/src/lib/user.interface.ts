import { City } from './city.enum.js';
import {UserRole} from './user-role.enum';

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  city: City;
}