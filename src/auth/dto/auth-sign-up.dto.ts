import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthSignUpDto {
  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;
}
