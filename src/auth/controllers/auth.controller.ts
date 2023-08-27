import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthSignInDto, AuthSignUpDto } from '../dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  public signUp(@Body() dto: AuthSignUpDto): unknown {
    return this.authService.signUp(dto);
  }

  @Post('sign-in')
  public signIn(@Body() dto: AuthSignInDto): unknown {
    return this.authService.signIn(dto);
  }
}
