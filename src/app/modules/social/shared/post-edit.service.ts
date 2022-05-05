import { LoggerService } from '@shared/services/logger.service';
import { EPostEditAction as Action, IPostEditEvent, Post } from '@social/shared/models/posts.model';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { FileService } from '@shared/services/file.service';
import { EFileType } from '@utility/enum/file.enum';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { SocialCenterService } from '@shared/services/social-center-service.service';

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

  protected resolveAction({ action, article, files, images, uid }: IPostEditEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (action) {
        case Action.Post:
          resolve(this.$social.sendPost(uid as string, article as string, images as string[]));
          break;
        case Action.FetchHistory: resolve(this.fetchHistory(uid as string)); break;
        case Action.Upload: resolve(this.upload(files as File[])); break;
      }
    });
  }

  private upload(files: File[]): AngularFireUploadTask[] {
    const Tasks: AngularFireUploadTask[] = [];
    files.forEach(file => {
      Tasks.push(this.$file.upload(EFileType.Image, file.name, file as File));
    });
    return Tasks;
  }

  private fetchHistory(uid: string): Promise<Post> {
    return this.$social.fetchHistory(uid);
  }
}
