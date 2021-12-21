import { IUser } from '@utility/interface/user.interface';

export class User implements IUser {
  public name: string;
  public id: string;
  public avatar: string;
  public friends: string[];
  constructor({ id, avatar, friends, name }: IUser) {
    this.name = name;
    this.id = id;
    this.avatar = avatar || '';
    this.friends = friends || [];
  }
}
