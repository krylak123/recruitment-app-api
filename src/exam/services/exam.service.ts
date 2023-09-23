import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/services';
import { ExamDto } from '../dto/exam.dto';

@Injectable()
export class ExamService {
  constructor(private prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async getAllExams() {
    return this.prismaService.exam.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        expLevel: true,
        createAt: true,
        timeLimitSummary: true,
        questionQuantity: true,
        questionOpenList: {
          select: {
            id: true,
            name: true,
            expLevel: true,
            content: true,
            timeLimit: true,
          },
        },
        questionCloseList: {
          select: {
            id: true,
            name: true,
            content: true,
            expLevel: true,
            timeLimit: true,
            answers: {
              select: {
                id: true,
                content: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public async getExamById(examWhereUniqueInput: Prisma.ExamWhereUniqueInput) {
    const exam = await this.prismaService.exam.findUnique({
      where: examWhereUniqueInput,
      select: {
        id: true,
        name: true,
        description: true,
        expLevel: true,
        createAt: true,
        timeLimitSummary: true,
        questionQuantity: true,
        questionOpenList: {
          select: {
            id: true,
            name: true,
            expLevel: true,
            content: true,
            timeLimit: true,
          },
        },
        questionCloseList: {
          select: {
            id: true,
            name: true,
            content: true,
            expLevel: true,
            timeLimit: true,
            answers: {
              select: {
                id: true,
                content: true,
                isCorrect: true,
              },
            },
          },
        },
      },
    });

    if (!exam) throw new NotFoundException("exam doesn't exists");

    return exam;
  }

  public async createExam(dto: ExamDto): Promise<void> {
    const { name, description, expLevel, questionOpenList, questionCloseList } =
      dto;

    try {
      await this.prismaService.exam.create({
        data: {
          name,
          description,
          expLevel,
          timeLimitSummary: 999,
          questionQuantity: questionOpenList.length + questionCloseList.length,
          questionOpenList: {
            connect: questionOpenList.map(id => ({ id })),
          },
          questionCloseList: {
            connect: questionCloseList.map(id => ({ id })),
          },
        },
        include: {
          questionOpenList: true,
          questionCloseList: true,
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
