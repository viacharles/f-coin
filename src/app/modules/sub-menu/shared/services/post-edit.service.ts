import { LoggerService } from '@shared/services/logger.service';
import { EPostEditAction as Action, IPostEditEvent } from '@social/shared/models/posts.model';
import { FeatureService } from '@utility/abstract/feature-service.abstract';
import { Injectable } from '@angular/core';
import { UserService } from '@user/shared/services/user.service';
import { FileService } from '@shared/services/file.service';

@Injectable({
  providedIn: 'root'
})
export class PostEditService extends FeatureService<IPostEditEvent, Action>{

  constructor(
    protected $logger: LoggerService,
    private $user: UserService,
    private $file: FileService) {
    super($logger);
  }

  protected featureName = 'post';

  protected resolveAction(event: IPostEditEvent): Promise<any> {
    return new Promise<any>((resolve) => {
      switch (event.action) {
        case Action.FilesUpload:
          this.$user.getUser().then(user => resolve(this.fileUpload(event.files as FileList, user.id)));
          break;
        case Action.Post:
          resolve(this.post());
          break;
      }
    });
  }

  private fileUpload(files: FileList, uid: string) {
  }

  private post() {

  }
}
