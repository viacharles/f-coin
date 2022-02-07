import { SocialCenterService } from './../../../shared/services/social-center.service';
import { LoggerService } from '@shared/services/logger.service';
import { EPostEditAction as Action, IPostEditEvent, Post } from '@social/shared/models/posts.model';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { FileService } from '@shared/services/file.service';
import { EFileType } from '@utility/enum/file.enum';
import { AngularFireUploadTask } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class PostEditService extends FeatureService<IPostEditEvent, Action>{

  constructor(
    protected $logger: LoggerService,
    private $file: FileService,
    private $social: SocialCenterService
    ) {
    super($logger);
  }

  protected featureName = 'post';

  protected resolveAction({action, fileType, article, files, images, uid }: IPostEditEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.Post:
          resolve(this.post(fileType as EFileType, article as string, images, uid, files as File[], ));
          break;
        case Action.fetchHistory:
          resolve(this.fetchHistory(uid));
      }
    });
  }

  private post(fileType: EFileType, article: string, images: string[], uid: string, files?: File[] )
  : AngularFireUploadTask[] {
    const taskArray: AngularFireUploadTask[] = [];
    this.$social.sendPost( uid, article, images);
    files?.forEach(file => {
      taskArray.push(this.$file.upload(fileType, file.name, file as File));
    });
    console.log('dataUrlArray', taskArray, files);
    return taskArray;
  }

  private fetchHistory(uid: string): Promise<Post> {
    return this.$social.fetchHistory(uid);
  }
}
