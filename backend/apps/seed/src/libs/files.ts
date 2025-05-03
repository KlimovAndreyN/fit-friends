import { Logger } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path/posix';
import { resolve } from 'node:path';

import { File } from '@backend/shared/core';
import { createDirectory, deleteDirectory } from '@backend/shared/helpers';
import { FileUploaderEntity, FileUploaderRepository } from '@backend/file-storage/file-uploader';

import { FilesPath } from './mock-data';

export async function clearFiles(fileUploaderRepository: FileUploaderRepository, path: string, distPath: string): Promise<void> {
  await deleteDirectory(path);
  await deleteDirectory(distPath);

  const ids = await fileUploaderRepository.getAllIds();

  for (const id of ids) {
    await fileUploaderRepository.deleteById(id);
  }
}

export async function seedFiles(
  fileUploaderRepository: FileUploaderRepository,
  fromPath: string,
  toPath: string,
  toDistPath: string,
  dbPath: string
): Promise<string[]> {
  Logger.log(`Files in: ${fromPath}`);
  await createDirectory(toPath);
  await createDirectory(toDistPath);

  const fileIds = [];

  try {
    const filesNames = await fs.readdir(fromPath);

    for (const fileName of filesNames) {
      const sourceFile = resolve(fromPath, fileName);
      const stats = await fs.stat(sourceFile);
      const { size } = stats;

      if (stats.isFile()) {
        try {
          Logger.log(`file: ${fileName}, size: ${size}`);
          await fs.copyFile(sourceFile, resolve(toPath, fileName));
          await fs.copyFile(sourceFile, resolve(toDistPath, fileName));
          Logger.log('copy success!');

          const file: File = {
            originalName: fileName,
            hashName: fileName,
            mimetype: 'none',
            path: join(dbPath, fileName),
            size,
            subDirectory: FilesPath.SEED_STATIC
          };
          const fileEntity = new FileUploaderEntity(file);

          await fileUploaderRepository.save(fileEntity);

          const { id } = fileEntity;
          fileIds.push(id);

          Logger.log(`Added file: ${fileName} / ${id}`);
        } catch (err) {
          Logger.error('copy error:', err);
        }
      }
    }
  } catch (err) {
    Logger.error(`Error read direcrtory: ${fromPath}`, err);
  }

  return fileIds;
}
