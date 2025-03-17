import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser, MetroStationName, UserGender, UserRole } from '@backend/shared/core';

const SALT_ROUNDS = 10;

export class FitUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public birthday?: Date;
  public metroStationName: MetroStationName;
  public backgroundPath: string;
  public gender: UserGender;
  public role: UserRole;
  public avatarFileId: string;
  public passwordHash: string;
  public createdAt: Date;

  constructor(user?: AuthUser) {
    super();

    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? undefined;
    this.email = user.email;
    this.name = user.name;
    this.birthday = user.birthday;
    this.metroStationName = user.metroStationName;
    this.backgroundPath = user.backgroundPath;
    this.gender = user.gender;
    this.role = user.role;
    this.avatarFileId = user.avatarFileId;
    this.backgroundPath = user.backgroundPath;
    this.passwordHash = user.passwordHash;
    this.createdAt = user.createdAt;
  }

  public toPOJO(): AuthUser {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      birthday: this.birthday,
      metroStationName: this.metroStationName,
      backgroundPath: this.backgroundPath,
      gender: this.gender,
      role: this.role,
      avatarFileId: this.avatarFileId,
      passwordHash: this.passwordHash,
      createdAt: this.createdAt
    }
  }

  public async setPassword(password: string): Promise<FitUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);

    this.passwordHash = await hash(password, salt);

    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
