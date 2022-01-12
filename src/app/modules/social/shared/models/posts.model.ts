import { IPost } from '@utility/interface/socialCenter.interface';

export class Posts {
    constructor({ createTime, images, isBigCharacterPost, textContent, likes }: IPost) {
        this.createTime = createTime.toDate();
        this.images = images;
        this.isBigCharacterPost = isBigCharacterPost;
        this.textContent = textContent;
        this.likes = likes;
    }
    public createTime: Date;
    public images: string[];
    public isBigCharacterPost: boolean;
    public textContent: string;
    public likes: number;
}
