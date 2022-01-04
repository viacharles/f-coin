import { IUser } from '@utility/interface/user.interface';

export class User implements IUser {
  public name: string;
  public id: string;
  public avatar: string;
  public friends: string[];
  public isCoining?: boolean | undefined;
  public totalAssets: number;
  constructor({ id, avatar, friends, name, totalAssets }: IUser) {
    this.name = name;
    this.id = id;
    this.avatar = avatar || '';
    this.friends = friends || [];
    this.totalAssets = totalAssets || 0;
  }

  public addFriends(friendIds: string | string[]) {
    switch (typeof friendIds) {
      case 'string':
        if (!this.friends.includes(friendIds)) {
          this.friends.push(friendIds);
        }
        break;
      default: this.friends = [...this.friends, ...friendIds]; break;
    }
  }
}
