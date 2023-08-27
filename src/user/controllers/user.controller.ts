import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../../auth/guards';
import { GetUser } from '../../auth/decorators';
import { User } from '@prisma/client';
import { UserService } from '../services/user.service';
import { UserWithoutHashType } from '../../auth/types';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  public getAllUsers(): Promise<UserWithoutHashType[]> {
    return this.userService.getAllUsers();
  }

  @Get('me')
  public getLoggedUser(@GetUser() user: User): User {
    return user;
  }
}
