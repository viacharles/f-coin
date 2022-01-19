import { IEvent } from '@utility/interface/common.interface';
export enum EPostEditAction {
    FilesUpload = 0,
    Post,
}

export interface IPostEditEvent extends IEvent<EPostEditAction> {
    id: string;
    files?: FileList;
}
