import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import 'multer'; // Express.Multer.File

import { FILE_KEY, FileStorageRoute, ServiceRoute, UploadedFileRdo } from '@backend/shared/core';
import { joinUrl, makeHeaders, multerFileToFormData } from '@backend/shared/helpers';
import { apiConfig } from '@backend/api/config';

@Injectable()
export class FileService {
  private readonly logger = new Logger(FileService.name);

  constructor(
    private readonly httpService: HttpService,
    @Inject(apiConfig.KEY)
    private readonly apiOptions: ConfigType<typeof apiConfig>
  ) { }

  public makePath(file: UploadedFileRdo): string {
    if (!file) {
      return '';
    }

    const { subDirectory, hashName } = file;
    const src = joinUrl(this.apiOptions.staticFileServiceUrl, subDirectory, hashName);

    return src;
  }


  public async getFile(fileId: string, requestId: string): Promise<UploadedFileRdo> {
    if (!fileId) {
      return null;
    }

    const url = joinUrl(this.apiOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, fileId);
    const headers = makeHeaders(requestId);
    const { data } = await this.httpService.axiosRef.get<UploadedFileRdo>(url, headers);

    return data;
  }

  public async getFilePath(fileId: string, requestId: string): Promise<string> {
    const file = await this.getFile(fileId, requestId);

    return this.makePath(file);
  }

  public async uploadFile(file: Express.Multer.File, requestId: string): Promise<UploadedFileRdo | null> {
    if (!file) {
      return null;
    }

    const url = joinUrl(this.apiOptions.fileStorageServiceUrl, ServiceRoute.FileStorage, FileStorageRoute.Upload);
    const headers = makeHeaders(requestId);
    const fileFormData = new FormData();

    // если бы был File, то можно без дополнительной конвертации отправить указав заголовок 'Content-Type': 'multipart/form-data'
    multerFileToFormData(file, fileFormData, FILE_KEY);

    const { data: fileRdo } = await this.httpService.axiosRef.post<UploadedFileRdo>(url, fileFormData, headers);

    return fileRdo;
  }
}
