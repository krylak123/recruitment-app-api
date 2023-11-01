import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../../auth/decorators';
import { JwtGuard } from '../../auth/guards';
import { UserWithoutHashType } from '../../auth/types';
import { ListResponseInterface } from '../../shared/models';
import { UserService } from '../services';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('candidates')
  public getAllCandidates(): Promise<
    ListResponseInterface<UserWithoutHashType>
  > {
    return this.userService.getAllCandidates();
  }

  @Get('employees')
  public getAllEmployees(): Promise<
    ListResponseInterface<UserWithoutHashType>
  > {
    return this.userService.getAllEmployees();
  }

  @Get('me')
  public getLoggedUser(@GetUser() user: User): UserWithoutHashType {
    return user;
  }

  @Get(':id')
  public getUserById(
    @Param('id')
    paramId: string,
  ): Promise<UserWithoutHashType> {
    return this.userService.getUserById({ id: paramId });
  }
}
