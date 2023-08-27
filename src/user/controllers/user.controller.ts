import {
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
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
  public getLoggedUser(@GetUser() user: User): UserWithoutHashType {
    return user;
  }

  @Get(':id')
  public getUserById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    paramId: string,
  ): Promise<UserWithoutHashType> {
    return this.userService.getUserById({ id: +paramId });
  }
}
