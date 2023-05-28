/**
 * The function creates a NestJS application and sets up Swagger documentation for a Tickets API.
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Tickets API')
    .setDescription('Tickets API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      filter: true,
      showRequestDuration: true,
    },
  });
  await app.listen(env.PORT || 3000);
}
bootstrap();
