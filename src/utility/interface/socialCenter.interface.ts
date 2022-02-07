import firebase from "firebase/app";

export interface IPost {
    createTime: firebase.firestore.Timestamp;
    images: string[];
    article: string;
    likes: number;
    issuerId: string;
}

export interface ISocialCenter {
    history: { [key: string]: IPost };
}