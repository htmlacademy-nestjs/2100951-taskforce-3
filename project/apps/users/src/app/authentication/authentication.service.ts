import { ConflictException, Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { WorkplaceUserMemoryRepository } from '../workplace-user/workplace-user-memory.repository.js';
import { WorkplaceUserEntity } from '../workplace-user/workplace-user.entity.js';
import { AUTH_USER_EXISTS } from './authentication.constant.js';
import { CreateUserDto } from './dto/create-user.dto.js';

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly workplaceUserRepository: WorkplaceUserMemoryRepository
    ) {}
  
    public async register(dto: CreateUserDto) {
        const {email, firstname, lastname, password, dateBirth, city, role} = dto;
    
        const workplaceUser = {
          email, firstname, lastname, role, city,
          avatar: '', dateBirth: dayjs(dateBirth).toDate(),
          passwordHash: ''
        };
    
        const existUser = await this.workplaceUserRepository
          .findByEmail(email);
    
        if (existUser) {
          throw new ConflictException(AUTH_USER_EXISTS);
        }
    
        const userEntity = await new WorkplaceUserEntity(workplaceUser)
          .setPassword(password)
    
        return this.workplaceUserRepository
          .create(userEntity);
      }
    
  }