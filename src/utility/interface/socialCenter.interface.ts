import { IPage } from '@utility/interface/route.interface';
import firebase from "firebase/app";

export interface IPost {
    createTime: firebase.firestore.Timestamp;
    article: string;
    images: string[];
    posterId: string;
    likes: number;
}

export interface ISocialCenter {
    history: { [key: string]: IPost };
}