export class TokensStore {
  private static accessTokenName = 'fit-friends-access-token';
  private static refreshTokenName = 'fit-friends-refresh-token';

  static getAccessToken() {
    const token = localStorage.getItem(this.accessTokenName);

    return token ?? '';
  }

  static getRefreshToken() {
    const token = localStorage.getItem(this.refreshTokenName);

    return token ?? '';
  }

  static save(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenName, accessToken);
    localStorage.setItem(this.refreshTokenName, refreshToken);
  }

  static drop() {
    localStorage.removeItem(this.accessTokenName);
    localStorage.removeItem(this.refreshTokenName);
  }
}
