import { ExpLevel } from '@prisma/client';
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

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
  public answers: QuestionCloseAnswerDto[];
}

class QuestionCloseAnswerDto {
  @IsNotEmpty()
  public content: string;

  @IsBoolean()
  @IsNotEmpty()
  public isCorrect: boolean;
}
