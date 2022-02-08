import { PostEditService } from '@social/shared/services/post-edit.service';
import { Component, Input, AfterViewInit } from '@angular/core';
import { EFileType } from '@utility/enum/file.enum';
import { EPostEditAction as Action } from '@social/shared/models/posts.model';
import { User } from '@user/shared/models/user.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {
  @Input() user?: User;
  constructor(private $feature: PostEditService) { }

  public step = 1;
  public files: File[] = [];
  public images: string[] = [];
  public article = '';

  public post(): void {
    this.$feature.fireEvent({
      action: Action.Post,
      fileType: EFileType.Image,
      article: this.article,
      files: this.files,
      images: this.images,
      uid: this.user?.id as string
    });
  }

}
