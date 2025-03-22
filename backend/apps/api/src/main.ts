import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { BearerAuth, BearerAuthOption, GlobalRoute } from '@backend/shared/core';
import { InjectBearerAuthInterceptor } from '@backend/shared/interceptors';
import { apiConfig, ApiConfig } from '@backend/api/config';

import { AppModule } from './app/app.module';
import { InjectRequestIdGuard } from './app/guards/inject-request-id.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const apiOption = app.get<ApiConfig>(apiConfig.KEY);
  const { port, accountServiceUrl, fileStorageServiceUrl, staticFileServiceUrl, fitServiceUrl } = apiOption;

  app.setGlobalPrefix(GlobalRoute.Api);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Api API')
    .setDescription('The Api API description')
    .setVersion('1.0')
    .addBearerAuth(BearerAuthOption, BearerAuth.AccessToken)
    .addBearerAuth(BearerAuthOption, BearerAuth.RefreshToken)
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(GlobalRoute.Swagger, app, documentFactory);
  //

  app.useGlobalGuards(new InjectRequestIdGuard());
  app.useGlobalInterceptors(new InjectBearerAuthInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  await app.listen(port);
  // Микросервисы
  Logger.log(`FileStorage Service on: ${fileStorageServiceUrl}`);
  Logger.log(`StaticFile Service on: ${staticFileServiceUrl}`);
  Logger.log(`Account Service on: ${accountServiceUrl}`);
  Logger.log(`Fit Service on: ${fitServiceUrl}`);
  //
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GlobalRoute.Api}`);
  Logger.log(`Swagger on: http://localhost:${port}/${GlobalRoute.Swagger}`);
}

bootstrap();
