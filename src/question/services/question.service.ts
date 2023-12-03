import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestionClose, QuestionOpen } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/services';
import { ListResponseInterface } from '../../shared/models';
import { QuestionCloseDto } from '../dto/question-close.dto';
import { QuestionOpenDto } from '../dto/question-open.dto';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  public async getAllCloseQuestion(): Promise<
    ListResponseInterface<QuestionClose>
  > {
    const quantity: number = await this.prismaService.questionClose.count();
    const data: QuestionClose[] =
      await this.prismaService.questionClose.findMany({
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
      });

    return {
      quantity,
      data,
    };
  }

  public async getAllOpenQuestions(): Promise<
    ListResponseInterface<QuestionOpen>
  > {
    const quantity: number = await this.prismaService.questionOpen.count();
    const data: QuestionOpen[] =
      await this.prismaService.questionOpen.findMany();

    return {
      quantity,
      data,
    };
  }

  public async createCloseQuestion(dto: QuestionCloseDto): Promise<void> {
    const { name, content, expLevel, timeLimit, answers } = dto;
    const answersObjs = answers.map(item => ({
      content: item.content,
      isCorrect: item.isCorrect,
    }));

    try {
      await this.prismaService.questionClose.create({
        data: {
          name,
          content,
          expLevel,
          timeLimit,
          answers: {
            createMany: {
              data: answersObjs,
            },
          },
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }

  public async createOpenQuestion(dto: QuestionOpenDto): Promise<void> {
    const { name, content, expLevel, timeLimit } = dto;

    try {
      await this.prismaService.questionOpen.create({
        data: {
          name,
          content,
          expLevel,
          timeLimit,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }

      throw error;
    }
  }
}
