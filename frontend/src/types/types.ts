export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

//! временно
export type OfferType = {
  id: string;
  title: string;
  description: string;
  backgroundPath: string;
  price: number;
  oldPrice: number;
};

export type OnFileInputChange = (filePath: string, file: File | undefined) => void;

export type OnClick = () => void;
