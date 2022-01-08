import { IPost } from './../../../../../utility/interface/socialCenter.interface';
import firebase from 'firebase/app';

export class Posts {
    constructor({createTime, images, isBigCharacterPost, location, textContent, videos, likes}: IPost) {
        this.createTime = createTime.toDate();
        this.images = images;
        this.isBigCharacterPost = isBigCharacterPost;
        this.location = location;
        this.textContent = textContent;
        this.videos = videos;
        this.likes = likes;
    }
    public createTime: Date;
    public images: string[];
    public isBigCharacterPost: boolean;
    public location: string;
    public textContent: string;
    public videos: string[];
    public likes: number;
}
