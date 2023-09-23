import { ExpLevel } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty } from 'class-validator';

export class ExamDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsEnum(ExpLevel)
  @IsNotEmpty()
  public expLevel: ExpLevel;

  @IsArray()
  public questionCloseList: string[];

  @IsArray()
  public questionOpenList: string[];
}
