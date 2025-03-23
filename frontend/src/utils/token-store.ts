class TokenStore {
  protected static tokenName = 'token';

  static getToken() {
    const token = localStorage.getItem(this.tokenName);

    return token ?? '';
  }

  static save(token: string) {
    localStorage.setItem(this.tokenName, token);
  }

  static drop() {
    //!
    // eslint-disable-next-line no-console
    console.log('TokenStore-drop', this.tokenName);

    //!localStorage.removeItem(this.tokenName);
  }
}

export class AccessTokenStore extends TokenStore {
  protected static tokenName = 'fit-friends.access-token';
}

export class RefreshTokenStore extends TokenStore {
  protected static tokenName = 'fit-friends.refresh-token';
}
