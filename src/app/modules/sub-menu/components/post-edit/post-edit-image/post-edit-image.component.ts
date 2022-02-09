import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '@user/shared/models/user.model';
import { AngularFireUploadTask } from '@angular/fire/storage';
import { EPostEditAction as Action } from '@social/shared/models/posts.model';
import { PostEditService } from '@social/shared/services/post-edit.service';

@Component({
  selector: 'app-post-edit-image',
  templateUrl: './post-edit-image.component.html',
  styleUrls: ['./post-edit-image.component.scss']
})
export class PostEditImageComponent {
  @Input() user?: User;
  @Output() updateImages = new EventEmitter<string[]>();

  constructor(
    private $feature: PostEditService
  ) { }

  public selectedFiles: File[] = [];
  public progress: number[] = [];

  public delete(id: number): void {
    this.selectedFiles = this.selectedFiles.filter((_, index) => index !== id);
  }

  public upload() {
    this.$feature.fireEvent<AngularFireUploadTask[]>({
      action: Action.Upload,
      files: this.selectedFiles
    }).then(
      tasks => {
        this.progress = tasks.map(() => 0);
        tasks.forEach((task, index) =>
          task.percentageChanges().subscribe(per => this.progress[index] = per as number));
      }
    );
  }

  public selectFiles(files: File[]): void {
    console.log('selectFiles')
    if (files.length > 0) {
      this.selectedFiles = [...files];
      this.selectedFiles.forEach((file, ) => {
        console.log('selectedFiles',file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (ev: ProgressEvent<FileReader>) => {
          console.log('onload',ev, file)
        }
      }
      );
    }
  }

}
