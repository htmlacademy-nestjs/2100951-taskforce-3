import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger/dist/index.js';
import { fillObject } from '@project/util/util-core';
import { AuthenticationService } from './authentication.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { LoggedUserRdo } from './rdo/logged-user.rdo.js';
import { UserRdo } from './rdo/user.rdo.js';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
    constructor(
      private readonly authService: AuthenticationService
    ) {}

    @ApiResponse({
        status: HttpStatus.CREATED,
        description: 'The new user has been successfully created.'
      })
    @Post('register')
    public async create(@Body() dto: CreateUserDto) {
      const newUser = await this.authService.register(dto);
      return fillObject(UserRdo, newUser);
    }

    @ApiResponse({
        type: LoggedUserRdo,
        status: HttpStatus.OK,
        description: 'User has been successfully logged.'
      })
      @ApiResponse({
        status: HttpStatus.UNAUTHORIZED,
        description: 'Password or Login is wrong.',
      })
      @Post('login')
      @HttpCode(HttpStatus.OK)
      public async login(@Body() dto: LoginUserDto) {
        const verifiedUser = await this.authService.verifyUser(dto);
        return fillObject(LoggedUserRdo, verifiedUser);
      }
    
      @ApiResponse({
        type: UserRdo,
        status: HttpStatus.OK,
        description: 'User found'
      })
    @Get(':id')
    public async show(@Param('id') id: string) {
      const existUser = await this.authService.getUser(id);
      return fillObject(UserRdo, existUser);
    }
  }
