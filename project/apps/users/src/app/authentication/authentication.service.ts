import { Injectable } from '@nestjs/common';
import { WorkplaceUserMemoryRepository } from '../workplace-user/workplace-user-memory.repository.js';

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly blogUserRepository: WorkplaceUserMemoryRepository
    ) {}
  
  }