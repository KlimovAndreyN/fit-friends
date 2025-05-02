import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { ICertificateRdo } from '../interfaces/rdo/i-certificate.rdo';

//! добавить описание в ApiProperty
export class CertificateRdo implements ICertificateRdo {
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
