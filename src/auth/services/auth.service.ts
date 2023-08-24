import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  public signUp(): unknown {
    return { msg: 'service signUp' };
  }

  public signIn(): unknown {
    return { msg: 'service signIn' };
  }
}
