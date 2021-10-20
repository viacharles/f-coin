import { IFriend } from '@utility/interface/user.inteface';

export class Friend implements IFriend {
  public name: string;
  constructor({ name }: IFriend) {
    this.name = name;
  }
}
