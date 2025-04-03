import { compare, genSalt, hash } from 'bcrypt';

import { Entity, StorableEntity, AuthUser } from '@backend/shared/core';

const SALT_ROUNDS = 10;

export class FitUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: AuthUser['email'];
  public name: AuthUser['name'];
  public birthday?: AuthUser['birthday'];
  public location: AuthUser['location'];
  public backgroundPath: AuthUser['backgroundPath'];
  public gender: AuthUser['gender'];
  public role: AuthUser['role'];
  public avatarFileId: AuthUser['avatarFileId'];
  public about: AuthUser['about'];
  public passwordHash: AuthUser['passwordHash'];
  public createdAt: AuthUser['createdAt'];

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
    this.location = user.location;
    this.backgroundPath = user.backgroundPath;
    this.gender = user.gender;
    this.role = user.role;
    this.avatarFileId = user.avatarFileId || '';
    this.about = user.about || '';
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
      location: this.location,
      backgroundPath: this.backgroundPath,
      gender: this.gender,
      role: this.role,
      avatarFileId: this.avatarFileId,
      about: this.about,
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
