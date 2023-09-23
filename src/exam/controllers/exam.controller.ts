import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';

import { ExamDto } from '../dto/exam.dto';
import { ExamService } from '../services/exam.service';

// TODO jak ogarnę auth na FE odkomentować
// @UseGuards(JwtGuard)
@Controller('exam')
export class ExamController {
  constructor(private questionService: ExamService) {}
  @Get('all')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getAllExams() {
    return this.questionService.getAllExams();
  }

  @Get(':id')
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  public getExamById(
    @Param('id')
    paramId: string,
  ) {
    return this.questionService.getExamById({ id: paramId });
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  public createExam(@Body() dto: ExamDto): Promise<void> {
    return this.questionService.createExam(dto);
  }
}