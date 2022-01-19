import { Component, OnInit } from '@angular/core';
import { EFileType } from '@utility/enum/file.enum';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {

  constructor() { }

  public textContent = '';
  public isMultiple = true;
  public allowType = EFileType.Image;
  public allows = [EFileType.Image];
  public uploadingFile?: File;

  ngOnInit(): void {
  }

  public showFileList(file: FileList): void {

  }


}
