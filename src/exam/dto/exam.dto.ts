import { ExpLevel } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class ExamDto {
  @IsNotEmpty()
  public name: string;

  @IsNotEmpty()
  public description: string;

  @IsEnum(ExpLevel)
  @IsNotEmpty()
  public expLevel: ExpLevel;
}
