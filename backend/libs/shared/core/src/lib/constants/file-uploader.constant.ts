export const FILE_KEY = 'file';

export const FileUploaderFileApiBody = {
  schema: {
    type: 'object',
    properties: {
      [FILE_KEY]: {
        type: 'string',
        format: 'binary'
      }
    }
  }
};
