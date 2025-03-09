import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { PrefixOption } from '@project/shared/core';
import { InjectRequestIdInterceptor } from '@project/shared/interceptors';
import { fileStorageConfig, FileStorageConfig } from '@project/file-storage/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const fileStorageOption = app.get<FileStorageConfig>(fileStorageConfig.KEY);
  const { port } = fileStorageOption;

  app.setGlobalPrefix(PrefixOption.Global);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('FileStorage API')
    .setDescription('The FileStorage API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, documentBuilder);

  SwaggerModule.setup(PrefixOption.Swagger, app, documentFactory);
  //

  app.useGlobalInterceptors(new InjectRequestIdInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${PrefixOption.Global}`);
  Logger.log(`Swagger on: http://localhost:${port}/${PrefixOption.Swagger}`);
}

bootstrap();
