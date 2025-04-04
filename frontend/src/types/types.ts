export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export type OnFileInputChange = (filePath: string, file: File | undefined) => void;

export type OnClick = () => void;
