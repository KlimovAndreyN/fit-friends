import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import 'multer'; // Express.Multer.File

import {
  FILE_KEY, ApiParamOption, FileUploaderApiResponse, FileUploaderFileApiBody,
  UploadedFileRdo, FILE_ID_PARAM, FileStorageRoute, ServiceRoute
} from '@backend/shared/core';
import { MongoIdValidationPipe } from '@backend/shared/pipes';
import { fillDto } from '@backend/shared/helpers';

import { FileUploaderService } from './file-uploader.service';

@ApiTags('file-upload')
@Controller(ServiceRoute.FileStorage)
export class FileUploaderController {
  constructor(
    private readonly fileUploaderService: FileUploaderService
  ) { }

  @ApiResponse(FileUploaderApiResponse.FileUploaded)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiConsumes('multipart/form-data')
  @ApiBody(FileUploaderFileApiBody)
  @Post(FileStorageRoute.Upload)
  @UseInterceptors(FileInterceptor(FILE_KEY))
  public async uploadFile(@UploadedFile(FILE_KEY) file: Express.Multer.File): Promise<UploadedFileRdo> {
    const fileEntity = await this.fileUploaderService.saveFile(file);

    return fillDto(UploadedFileRdo, fileEntity.toPOJO());
  }

  @ApiResponse(FileUploaderApiResponse.FileFound)
  @ApiResponse(FileUploaderApiResponse.FileNotFound)
  @ApiResponse(FileUploaderApiResponse.BadRequest)
  @ApiParam(ApiParamOption.FileId)
  @Get(FILE_ID_PARAM)
  public async show(@Param(ApiParamOption.FileId.name, MongoIdValidationPipe) fileId: string): Promise<UploadedFileRdo> {
    const existFile = await this.fileUploaderService.getFile(fileId);

    return fillDto(UploadedFileRdo, existFile);
  }
}
