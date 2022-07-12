import { User } from "@user/shared/models/user.model";
import firebase from 'firebase';

export interface IFriend extends IUser {
  isLogin: boolean;
}
export interface IUser {
  id: string;
  name: string;
  avatar?: string;
  friends?: string[];
  inviteAddFriends?: string[];
  totalAssets?: number;
}
export interface IUserProfileDialog {
  user: User;
}
