
import { IFriend } from '@utility/interface/user.interface';

export class Friend implements IFriend {
  public id: string;
  public name: string;
  public latestSentence: string;
  public lastSendTime: string;
  public top = false;
  constructor({ id, name, latestSentence, lastSendTime, top }: IFriend) {
    this.id = id;
    this.name = name;
    this.lastSendTime = lastSendTime;
    this.latestSentence = latestSentence;
    this.top = top;
  }
}
