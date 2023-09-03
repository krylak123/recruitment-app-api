import { ExpLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class QuestionCloseDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public content: string;

  @IsNotEmpty()
  @IsEnum(ExpLevel)
  public expLevel: ExpLevel;

  @IsNotEmpty()
  public timeLimit: number;
}
