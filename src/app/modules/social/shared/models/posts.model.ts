import { IPost } from '@utility/interface/socialCenter.interface';
import { IEvent } from '@utility/interface/common.interface';
import { EFileType } from '@utility/enum/file.enum';
export enum EPostEditAction {
    Post = 0,
    fetchHistory
}

export interface IPostEditEvent extends IEvent<EPostEditAction> {
    action: EPostEditAction;
    uid: string;
    name?: string;
    fileType?: EFileType;
    files?: File[];
    article?: string;
}


export class Post {
    constructor({ createTime, images, article, likes }: IPost) {
        this.createTime = createTime.toDate();
        this.images = images;
        this.article = article;
        this.likes = likes;
    }
    public createTime: Date;
    public images: string[];
    public article: string;
    public likes: number;
}

