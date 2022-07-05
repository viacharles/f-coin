import { Component, Input } from '@angular/core';
import { CustomForm } from '@utility/abstract/custom-form.abstract';
import { EFileType } from '@utility/enum/file.enum';

@Component({
  selector: 'app-file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss']
})
export class FileSelectorComponent extends CustomForm<File>  {

  @Input() allowTypes: EFileType[] = [];

  constructor() {
    super();
  }

  get file(): File { return this.model as File; }
  set file(value: File) {
    this.notifyValueChange(value);
  }

  get acceptList(): string {
    return this.allowTypes.reduce((accept, type) => {
      switch (type) {
        case EFileType.All: return '*';
        case EFileType.Image: return `${accept},image/jpeg,image/jpg,image/png`;
        case EFileType.Pdf: return `${accept},.pdf`;
        case EFileType.Excel: return `${accept},.xls`;
      }
    }, '');
  }

  public onFileSelected(element: Event): void {
    this.file = ((element.target as HTMLInputElement).files as FileList)[0];
  }



}
