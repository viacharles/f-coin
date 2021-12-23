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
  name: string;
  avatar?: string;
  friends?: string[];
  isCoining?: boolean;
  totalAssets?: number;
}
