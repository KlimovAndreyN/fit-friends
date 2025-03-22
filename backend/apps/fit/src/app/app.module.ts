import { Module } from '@nestjs/common';

import { FitConfigModule } from '@backend/fit/config';
//import { PrismaClientModule } from '@backend/fit/models';
//import { ProductModule } from '@backend/fit/questionnaire'

@Module({
  imports: [
    FitConfigModule,
    //PrismaClientModule,
    //ProductModule
  ],
  controllers: [],
  providers: []//!,
  //!exports: [PrismaClientModule] // нужно?
})
export class AppModule { }
