import { AuthService } from '@auth/services';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthSignInDto, AuthSignUpDto } from '../dto';
import { AccessTokenInterface } from '../interfaces';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  public signUp(@Body() dto: AuthSignUpDto): Promise<AccessTokenInterface> {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  public signIn(@Body() dto: AuthSignInDto): Promise<AccessTokenInterface> {
    return this.authService.signIn(dto);
  }
}
