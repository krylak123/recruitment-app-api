import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
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

export class AuthSignUpAdditionalGroupDto {
  @IsString()
  @IsNotEmpty()
  public gitRepoLink: string;
}

export class AuthSignUpConsentsGroupDto {
  @IsBoolean()
  @IsNotEmpty()
  public acceptedRodo: boolean;
}

export class AuthSignUpDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthSignUpCommonGroupDto)
  public commonGroup: AuthSignUpCommonGroupDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthSignUpAdditionalGroupDto)
  public additionalGroup?: AuthSignUpAdditionalGroupDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AuthSignUpConsentsGroupDto)
  public consentsGroup?: AuthSignUpConsentsGroupDto;
}
