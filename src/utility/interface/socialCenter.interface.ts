import { IPage } from '@utility/interface/route.interface';
import firebase from "firebase/app";

export interface IPost {
    createTime: firebase.firestore.Timestamp,
    images: string[],
    videos: string[],
    isBigCharacterPost: boolean,
    location: string,
    textContent: string,
    likes: number
}

export interface ISocialCenter {
    history: {[key: string]: IPost};
}