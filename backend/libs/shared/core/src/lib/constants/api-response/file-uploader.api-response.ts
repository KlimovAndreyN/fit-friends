import { HttpStatus } from '@nestjs/common';

import { UploadedFileRdo } from '../../rdo/uploaded-file.rdo';

export const FileUploaderApiResponse = {
  FileUploaded: {
    type: UploadedFileRdo,
    status: HttpStatus.CREATED,
    description: 'The new file has been successfully upload.'
  },
  FileFound: {
    type: UploadedFileRdo,
    status: HttpStatus.OK,
    description: 'File found.'
  },
  FileNotFound: {
    status: HttpStatus.NOT_FOUND,
    description: 'File not found.'
  },
  BadRequest: {
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.'
  }
} as const;
