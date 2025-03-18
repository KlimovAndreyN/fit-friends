import { Inject, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import { FILE_KEY, FileStorageRoute, ServiceRoute, UploadedFileRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders, multerFileToFormData, parseAxiosError } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public async uploadFile(file: Express.Multer.File, requestId: string): Promise<UploadedFileRdo> {
    if (file) {
      const url = joinUrl(this.apiOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, FileStorageRoute.Upload);
      const headers = makeHeaders(requestId);

      try {
        const fileFormData = new FormData();

        multerFileToFormData(file, fileFormData, FILE_KEY);

        const { data: fileRdo } = await this.httpService.axiosRef.post<UploadedFileRdo>(url, fileFormData, headers);

        return fileRdo;
      } catch (error) {
        this.logger.error(`FilesService.uploadFile: ${parseAxiosError(error)}`);

        throw new InternalServerErrorException('File upload error!');
      }
    }
  }
}
