import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { ensureDir } from 'fs-extra';
import { extension } from 'mime-types';
import dayjs from 'dayjs';
import { writeFile } from 'node:fs/promises';
import { join } from 'path/posix';
import { randomUUID } from 'node:crypto';
import 'multer'; // Express.Multer.File

import { fileStorageConfig } from '@backend/file-storage/config';
import { StoredFile } from '@backend/shared/core';
import { fixEncoding } from '@backend/shared/helpers';

import { FileUploaderRepository } from './file-uploader.repository';
import { FileUploaderEntity } from './file-uploader.entity';
import { FileUploaderFactory } from './file-uploader.factory';

const DATE_FORMAT = 'YYYY MM';

@Injectable()
export class FileUploaderService {
  private readonly logger = new Logger(FileUploaderService.name);

  @Inject(fileStorageConfig.KEY)
  private readonly fileStorageConfig: ConfigType<typeof fileStorageConfig>;

  constructor(
    private readonly fileUploaderRepository: FileUploaderRepository
  ) { }

  private getUploadDirectoryPath(): string {
    return this.fileStorageConfig.uploadDirectoryPath;
  }

  private getDestinationFilePath(filename: string): string {
    return join(this.getUploadDirectoryPath(), this.getSubUploadDirectoryPath(), filename);
  }

  private getSubUploadDirectoryPath(): string {
    const [year, month] = dayjs().format(DATE_FORMAT).split(' ');

    return join(year, month);
  }

  private async writeFile(file: Express.Multer.File): Promise<StoredFile> {
    try {
      const uploadDirectoryPath = this.getUploadDirectoryPath();
      const subDirectory = this.getSubUploadDirectoryPath();
      const fileExtension = extension(file.mimetype) as string; //string | false из за того что тоставил типы - проверить
      const fileName = `${randomUUID()}.${fileExtension}`;
      const path = this.getDestinationFilePath(fileName);

      await ensureDir(join(uploadDirectoryPath, subDirectory));
      await writeFile(path, file.buffer);

      return {
        fileName,
        fileExtension,
        subDirectory,
        path
      };
    } catch (error) {
      this.logger.error(`Error while saving file: ${error.message}`);

      throw new Error(`Can't save file`);
    }
  }

  public async saveFile(file: Express.Multer.File): Promise<FileUploaderEntity> {
    if (!file) {
      throw new BadRequestException('File not sending.');
    }
    const storedFile = await this.writeFile(file);
    const fileEntity = new FileUploaderFactory().create({
      // проблемма с кодировкой в имени файла, даже из swagger приходят кривые имена
      // возможно стоит проверить версии бибилотек multer, nest.js ...
      originalName: fixEncoding(file.originalname),
      hashName: storedFile.fileName,
      subDirectory: storedFile.subDirectory,
      path: storedFile.path,
      mimetype: file.mimetype,
      size: file.size
    });

    await this.fileUploaderRepository.save(fileEntity);
    this.logger.log(`New file saved: ${fileEntity.path}`);

    return fileEntity;
  }

  public async getFile(fileId: string): Promise<FileUploaderEntity> {
    const existFile = await this.fileUploaderRepository.findById(fileId);

    if (!existFile) {
      const message = `File with ${fileId} not found.`;

      this.logger.log(message);

      throw new NotFoundException(message);
    }

    return existFile;
  }
}
