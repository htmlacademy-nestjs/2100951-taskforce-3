import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@project/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru'
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',

  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov'
  })
  public lastname: string;


  @ApiProperty({
    description: 'User password',
    example: '123456'
  })
  public password: string;

  @ApiProperty({
    description: 'User city',
    example: 'Ufa'
  })
  public city: string;

  @ApiProperty({
    description: 'User role',
    example: 'executor'
  })
  public role: UserRole;
}
