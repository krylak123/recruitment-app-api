import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port: string | number = process.env['PORT'] || 3000;

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}

bootstrap();
