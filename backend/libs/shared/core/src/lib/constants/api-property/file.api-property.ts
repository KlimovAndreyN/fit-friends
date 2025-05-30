export const FileApiProperty = {
  Id: {
    description: 'The unique file ID',
    example: '658170cbb954e9f5b905dcf4'
  },
  OriginalName: {
    description: 'The original filename',
    example: 'filename.txt'
  },
  HashName: {
    description: 'The hash filename',
    example: '658170cbb954e9f5b905dcf4.txt'
  },
  SubDirectory: {
    description: 'The file sub directory',
    example: 'password'
  },
  Mimetype: {
    description: 'The file mimetype',
    example: 'plain/text'
  },
  Size: {
    description: 'The file size',
    example: '500'
  }
} as const;

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
