import { Entity, StorableEntity, Friend } from '@backend/shared/core';

export class FitFriendEntity extends Entity implements StorableEntity<Friend> {
  public userId: Friend['userId'];
  public friends: Friend['friends'];
  public createdAt?: Friend['createdAt'];
  public updatedAt?: Friend['updatedAt'];

  constructor(friend?: Friend) {
    super();

    this.populate(friend);
  }

  public populate(friend?: Friend): void {
    if (!friend) {
      return;
    }

    this.id = friend.id;
    this.userId = friend.userId;
    this.friends = [...friend.friends];
    this.createdAt = friend.createdAt;
    this.updatedAt = friend.updatedAt;
  }

  public toPOJO(): Friend {
    return {
      id: this.id,
      userId: this.userId,
      friends: this.friends,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}

