import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Exam, Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/services';
import { ExamDto } from '../dto/exam.dto';

@Injectable()
export class ExamService {
  constructor(private prismaService: PrismaService) {}

  public async getAllExams(): Promise<Exam[]> {
    return this.prismaService.exam.findMany();
  }

  public async getExamById(
    examWhereUniqueInput: Prisma.ExamWhereUniqueInput,
  ): Promise<Exam> {
    const exam: Exam = await this.prismaService.exam.findUnique({
      where: examWhereUniqueInput,
    });

    if (!exam) throw new NotFoundException("exam doesn't exists");

    return exam;
  }

  public async createExam(dto: ExamDto): Promise<void> {
    const { name, description, expLevel } = dto;

    try {
      await this.prismaService.exam.create({
        data: {
          name,
          description,
          expLevel,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          console.log(error);
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }
}
