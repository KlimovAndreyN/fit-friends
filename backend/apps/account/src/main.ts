import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { BearerAuth, BearerAuthOption, PrefixOption } from '@project/shared/core';
import { InjectRequestIdInterceptor } from '@project/shared/interceptors';
import { AccountConfig, accountConfig } from '@project/account/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const accountOption = app.get<AccountConfig>(accountConfig.KEY);
  const { port } = accountOption;

  app.setGlobalPrefix(PrefixOption.Global);

  //Swagger
  const documentBuilder = new DocumentBuilder()
    .setTitle('Account API')
    .setDescription('The Account API description')
    .setVersion('1.0')
    .addBearerAuth(BearerAuthOption, BearerAuth.AccessToken)
    .addBearerAuth(BearerAuthOption, BearerAuth.RefreshToken)
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
