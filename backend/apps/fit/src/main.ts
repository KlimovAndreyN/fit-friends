import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { GlobalRoute } from '@backend/shared/core';
import { InjectRequestIdInterceptor, InjectUserIdInterceptor } from '@backend/shared/interceptors';
import { fitConfig, FitConfig } from '@backend/fit/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fitOption = app.get<FitConfig>(fitConfig.KEY);
  const { port } = fitOption;

  app.setGlobalPrefix(GlobalRoute.Api);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Fit API')
    .setDescription('The Fit API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(GlobalRoute.Swagger, app, documentFactory);
  //

  app.useGlobalInterceptors(
    new InjectRequestIdInterceptor(),
    new InjectUserIdInterceptor()
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${GlobalRoute.Api}`);
  Logger.log(`Swagger on: http://localhost:${port}/${GlobalRoute.Swagger}`);
}

bootstrap();
