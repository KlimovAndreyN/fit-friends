import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { Certificate } from '../interfaces/certificate.interface';

//! добавить описание в ApiProperty
export class CertificateRdo implements Certificate {
  @ApiProperty()
  @Expose()
  fileId: string;

  @ApiProperty()
  @Expose()
  filePath: string;

  @ApiProperty()
  @Expose()
  title: string;
}
