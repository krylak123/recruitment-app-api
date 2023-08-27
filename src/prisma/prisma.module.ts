import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@prisma/services';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
