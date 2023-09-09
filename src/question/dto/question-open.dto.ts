import { ExpLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class QuestionOpenDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public content: string;

  @IsEnum(ExpLevel)
  @IsNotEmpty()
  public expLevel: ExpLevel;

  @IsNotEmpty()
  public timeLimit: number;
}
