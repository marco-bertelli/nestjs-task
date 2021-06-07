import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // applico i decorator che trovo nei dto
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
