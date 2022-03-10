import { Component, OnInit } from '@angular/core';
import { BaseSubMenu } from '@utility/base/base-sub-menu';
import { EFileType } from '@utility/enum/file.enum';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent extends BaseSubMenu {

  constructor() {
    super();
  }

  public textContent = '';
  public isMultiple = true;
  public allowType = EFileType.Image;
  public allows = [EFileType.Image];
  public uploadingFile?: File;


  public showFileList(file: FileList): void {

  }


}
