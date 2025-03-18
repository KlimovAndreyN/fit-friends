import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import { FILE_KEY, FileStorageRoute, ServiceRoute, UploadedFileRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders, multerFileToFormData } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FilesService {
  private readonly logger = new Logger(FilesService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public makeSrc(file: UploadedFileRdo): string {
    if (!file) {
      return '';
    }

    const { subDirectory, hashName } = file;
    const src = joinUrl(this.apiOptions.staticFileServiceUrl, subDirectory, hashName);

    return src;
  }

  public async getFileSrc(fileId: string, requestId: string): Promise<string> {
    //! проверить позже
    console.log('fileId', fileId);

    if (!fileId) {
      return '';
    }

    const url = joinUrl(this.apiOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, fileId);
    const headers = makeHeaders(requestId);
    const { data: file } = await this.httpService.axiosRef.get<UploadedFileRdo>(url, headers);
    //!
    console.log('file', file);

    return this.makeSrc(file);
  }

  public async uploadFile(file: Express.Multer.File, requestId: string): Promise<UploadedFileRdo | null> {
    if (!file) {
      return null;
    }

    const url = joinUrl(this.apiOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, FileStorageRoute.Upload);
    const headers = makeHeaders(requestId);
    const fileFormData = new FormData();

    multerFileToFormData(file, fileFormData, FILE_KEY);

    const { data: fileRdo } = await this.httpService.axiosRef.post<UploadedFileRdo>(url, fileFormData, headers);

    return fileRdo;
  }
}
