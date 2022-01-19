import { IUser } from '@utility/interface/user.interface';

export class User implements IUser {
  public name: string;
  public id: string;
  public avatar: string;
  public friends: string[];
  public totalAssets: number;
  public inviteAddFriends: string[];
  constructor({ id, avatar, friends, name, totalAssets, inviteAddFriends }: IUser) {
    this.name = name;
    this.id = id;
    this.avatar = avatar || '';
    this.friends = friends || [];
    this.totalAssets = totalAssets || 0;
    this.inviteAddFriends = inviteAddFriends || [];
  }

  // public getUserData(): IUser {
  //   return ({
  //     id: this.id,

  //   });
  // }

  public addFriends(friendId: string): void {
    this.friends.push(friendId);
    this.inviteAddFriends = this.inviteAddFriends.filter(id => id !== friendId);
  }

  public ignoreInvite(friendIds: string): Promise<string[]> {
    return new Promise<string[]>((resolve) => {
      resolve(this.inviteAddFriends.filter(id => id !== friendIds))
    });
  }

}
