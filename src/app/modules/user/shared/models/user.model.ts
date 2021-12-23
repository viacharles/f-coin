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
}
