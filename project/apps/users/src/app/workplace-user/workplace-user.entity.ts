import { User, UserRole } from '@project/shared/app-types';
import { genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './workplace-user.constant.js';

export class WorkplaceUserEntity implements User {
  public _id: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public role: UserRole;
  public city: string;

  constructor(workplaceUser: User) {
    this.fillEntity(workplaceUser);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(workplaceUser: User) {
    this._id = workplaceUser._id;
    this.avatar = workplaceUser.avatar;
    this.dateBirth = workplaceUser.dateBirth;
    this.email = workplaceUser.email;
    this.firstname = workplaceUser.firstname;
    this.lastname = workplaceUser.lastname;
    this.passwordHash = workplaceUser.passwordHash;
    this.role = workplaceUser.role;
    this.city = workplaceUser.city;
  }

  public async setPassword(password: string): Promise<WorkplaceUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }
}