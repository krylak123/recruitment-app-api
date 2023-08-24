import { Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  public signUp(): unknown {
    return this.authService.signUp();
  }

  @Post('signIn')
  public signIn(): unknown {
    return this.authService.signIn();
  }
}
