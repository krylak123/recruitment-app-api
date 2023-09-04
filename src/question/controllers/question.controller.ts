import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { QuestionClose, QuestionOpen } from '@prisma/client';

import { JwtGuard } from '../../auth/guards';
import { QuestionCloseDto } from '../dto/question-close.dto';
import { QuestionOpenDto } from '../dto/question-open.dto';
import { QuestionService } from '../services/question.service';

@UseGuards(JwtGuard)
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Get('close/all')
  public getAllCloseQuestions(): Promise<QuestionClose[]> {
    return this.questionService.getAllCloseQuestion();
  }

  @Get('open/all')
  public getAllOpenQuestions(): Promise<QuestionOpen[]> {
    return this.questionService.getAllOpenQuestions();
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('close')
  public createCloseQuestion(@Body() dto: QuestionCloseDto): Promise<void> {
    return this.questionService.createCloseQuestion(dto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('open')
  public createOpenQuestion(@Body() dto: QuestionOpenDto): Promise<void> {
    return this.questionService.createOpenQuestion(dto);
  }
}
