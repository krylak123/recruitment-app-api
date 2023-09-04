import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestionClose, QuestionOpen } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/services';
import { QuestionCloseDto } from '../dto/question-close.dto';
import { QuestionOpenDto } from '../dto/question-open.dto';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  public async getAllCloseQuestion(): Promise<QuestionClose[]> {
    return this.prismaService.questionClose.findMany();
  }

  public async getAllOpenQuestions(): Promise<QuestionOpen[]> {
    return this.prismaService.questionOpen.findMany();
  }

  public async createCloseQuestion(dto: QuestionCloseDto): Promise<void> {
    const { name, content, expLevel, timeLimit, answers } = dto;

    console.log(answers);

    try {
      await this.prismaService.questionClose.create({
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
