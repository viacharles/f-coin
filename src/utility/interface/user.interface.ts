export interface IFriend extends IUser {
  id: string;
  name: string;
  isLogin: boolean;
}

/**
 * @description
 */
export interface IUser {
  id: string;
  avatar?: string;
  name: string;
  friends?: string[];
}
