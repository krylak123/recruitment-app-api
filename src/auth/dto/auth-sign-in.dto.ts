import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignInDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;
}
