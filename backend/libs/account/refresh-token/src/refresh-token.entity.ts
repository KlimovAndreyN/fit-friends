import { Entity, JwtToken, StorableEntity } from '@backend/shared/core';

export class RefreshTokenEntity extends Entity implements StorableEntity<JwtToken> {
  public tokenId: string;
  public userId: string;
  public expiresIn: Date;
  public createdAt: Date;

  constructor(token?: JwtToken) {
    super();
    this.populate(token);
  }

  public populate(token?: JwtToken): void {
    if (!token) {
      return;
    }

    this.id = token.id ?? '';
    this.expiresIn = token.expiresIn;
    this.userId = token.userId;
    this.tokenId = token.tokenId;
    this.createdAt = token.createdAt;
  }

  public toPOJO(): JwtToken {
    return {
      id: this.id,
      expiresIn: this.expiresIn,
      userId: this.userId,
      tokenId: this.tokenId,
      createdAt: this.createdAt
    }
  }
}
