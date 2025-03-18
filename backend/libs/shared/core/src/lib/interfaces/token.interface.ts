export enum TokenProp {
  AccessToken = 'accessToken',
  RefreshToken = 'refreshToken'
}

export interface Token {
  [TokenProp.AccessToken]: string;
  [TokenProp.RefreshToken]: string;
}
