import { ExpLevel, QuestionCloseAnswer } from '@prisma/client';
import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class QuestionCloseDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public content: string;

  @IsEnum(ExpLevel)
  @IsNotEmpty()
  public expLevel: ExpLevel;

  @IsNotEmpty()
  public timeLimit: number;

  @IsArray()
  @ArrayNotEmpty()
  public answers: QuestionCloseAnswer[];
}
