export interface IFriend extends IUser {
  isLogin: boolean;
}

/**
 * @description
 */
export interface IUser {
  id: string;
  name: string;
  avatar?: string;
  friends?: string[];
  inviteAddFriends?: string[];
  totalAssets?: number;
}
