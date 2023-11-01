import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthSignInDto, AuthSignUpDto } from '../dto';
import { JwtGuard } from '../guards';
import { AccessTokenInterface } from '../interfaces';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up-user')
  public signUpUser(@Body() dto: AuthSignUpDto): Promise<AccessTokenInterface> {
    return this.authService.signUp(dto, false);
  }

  @UseGuards(JwtGuard)
  @Post('sign-up-employee')
  public signUpEmployee(
    @Body() dto: AuthSignUpDto,
  ): Promise<AccessTokenInterface> {
    return this.authService.signUp(dto, true);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  public signIn(@Body() dto: AuthSignInDto): Promise<AccessTokenInterface> {
    return this.authService.signIn(dto);
  }
}
