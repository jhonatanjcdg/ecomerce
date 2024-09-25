import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerGlobal } from './middlewares/logger.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config))
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    exceptionFactory: errors => {
      const cleanErrors = errors.map(error => {
        return {property: error.property, constraints: error.constraints}
      })
      return new BadRequestException({
        alert: 'Se han detectado los siguientes errores',
        errors: cleanErrors
      })
    }
  }))
  app.use(LoggerGlobal)

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Ecomerce')
    .setDescription('API para el ecommerce')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  
  const document = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000);
}
bootstrap();
