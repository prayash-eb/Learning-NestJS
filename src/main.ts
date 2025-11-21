import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
const cookieSession = require("cookie-session")
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // globally handle session cookie
  app.use(cookieSession({
    keys:[process.env.COOKIE_KEY]
  }))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
