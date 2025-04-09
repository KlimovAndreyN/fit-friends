import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

import { Training } from '../../interfaces/training.interface';
import { TrainingLevel } from '../../types/training-level.enum';
import { Specialization } from '../../types/specialization.enum';
import { Duration } from '../../types/duration.enum';
import { Gender } from '../../types/gender.enum';

//! описание и ограничения для всего, часть можно взять с опросника только пользователя заменить на тренировку
export class TrainingApiDoc {
  @ApiProperty()
  @Expose()
  public id: Training['id'];

  @ApiProperty()
  @Expose()
  @IsString()
  public title: Training['title'];

  @ApiProperty()
  @Expose()
  @IsString()
  public backgroundPath: Training['backgroundPath'];

  @ApiProperty()
  @Expose()
  @IsEnum(TrainingLevel)
  trainingLevel: Training['trainingLevel'];

  @ApiProperty()
  @Expose()
  @IsString()
  @IsEnum(Specialization)
  specialization: Training['specialization'];

  @ApiProperty()
  @Expose()
  @IsEnum(Duration)
  duration: Training['duration'];

  @ApiProperty()
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  price: Training['price'];

  @ApiProperty()
  @Expose()
  @IsNumber({ maxDecimalPlaces: 0 })
  caloriesWaste: Training['caloriesWaste'];

  @ApiProperty()
  @Expose()
  @IsString()
  public description: Training['description'];

  @ApiProperty()
  @Expose()
  @IsEnum(Gender)
  gender: Training['gender'];

  @ApiProperty()
  @Expose()
  @IsString()
  public videoFileId: Training['videoFileId'];

  @ApiProperty()
  @Expose()
  @IsString()
  public videoFilePath: string //! IDetailTraining['videoFilePath'];

  //! @ApiProperty()
  // public [FILES_PROPERTY]: ICreateTrainingDto['files'];

  @ApiProperty()
  @Expose()
  rating: Training['rating'];

  @ApiProperty() //! тут как пропользоватлея, но это тренер
  @Expose()
  public userId: Training['userId'];

  @ApiProperty()
  @Expose()
  @IsBoolean() //! проверить что все ок при multipath/data, придет строка и нужно будет трансофрмировать, но участвовать будет в разных DTO
  isSpecial: Training['isSpecial'];

  @ApiProperty()
  @Expose({ name: 'createdAt' })
  public createdDate: string; //! IBasicDetailTrainingRdo['createdDate'];
}
