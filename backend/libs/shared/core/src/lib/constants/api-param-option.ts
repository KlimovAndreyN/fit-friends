import { ApiPropertyOption } from './api-property-option';
import { FileApiProperty } from './api-property/file.api-property';

export const ApiParamOption = {
  UserId: {
    name: 'userId',
    schema: ApiPropertyOption.User.Id
  },
  CommentId: {
    name: 'commentId',
    schema: ApiPropertyOption.Comment.Id
  },
  FileId: {
    name: 'fileId',
    schema: FileApiProperty.Id
  }
} as const;

export const USER_ID_PARAM = `:${ApiParamOption.UserId.name}`;
export const FILE_ID_PARAM = `:${ApiParamOption.FileId.name}`;
export const COMMENT_ID_PARAM = `:${ApiParamOption.CommentId.name}`;
