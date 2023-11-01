import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  ValidateNested,
} from 'class-validator';

export class AuthSignUpCommonGroupDto {
  @IsNotEmpty()
  public firstName: string;

  @IsNotEmpty()
  public lastName: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public phone: string;
}

export class AuthSignUpDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthSignUpCommonGroupDto)
  public commonGroup: AuthSignUpCommonGroupDto;
}
