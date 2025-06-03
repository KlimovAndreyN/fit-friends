import { Entity, StorableEntity, Friend } from '@backend/shared/core';

export class FitFriendEntity extends Entity implements StorableEntity<Friend> {
  public firstFriendId: Friend['firstFriendId'];
  public secondFriendId: Friend['secondFriendId'];
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
    this.firstFriendId = friend.firstFriendId;
    this.secondFriendId = friend.secondFriendId;
    this.createdAt = friend.createdAt;
    this.updatedAt = friend.updatedAt;
  }

  public toPOJO(): Friend {
    return {
      id: this.id,
      firstFriendId: this.firstFriendId,
      secondFriendId: this.secondFriendId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }
}
