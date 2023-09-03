import { ForbiddenException, Injectable } from '@nestjs/common';
import { QuestionClose } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { PrismaService } from '../../prisma/services';
import { QuestionCloseDto } from '../dto/question-close.dto';

@Injectable()
export class QuestionService {
  constructor(private prismaService: PrismaService) {}

  public async getAllUQuestionClose(): Promise<QuestionClose[]> {
    return this.prismaService.questionClose.findMany();
  }

  public async createCloseQuestion(dto: QuestionCloseDto): Promise<void> {
    const { name, content, expLevel, timeLimit } = dto;

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

        console.log('w ifie');
      }

      console.log('poza ifem');

      throw error;
    }
  }
}
