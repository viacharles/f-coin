import { OverlayService } from '@shared/overlay/overlay.service';
import { EFileType } from './../../../../../utility/enum/file.enum';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';

// file selector for only specific/all file type

@Component({
  selector: 'app-file-select-icon',
  templateUrl: './file-select-icon.component.html',
  styleUrls: ['./file-select-icon.component.scss'],
  providers: [getFormProvider(FileSelectIconComponent)]
})
export class FileSelectIconComponent extends CustomForm<FileList> implements OnInit {
  @Output() uploadingFiles = new EventEmitter<FileList>();
  @Input() isMultiple = true;
  @Input() allowType: EFileType = EFileType.Image;
  @Input() iconCode = '';

  constructor() { super(); }

  get files(): FileList { return this.model as FileList; }
  set files(value: FileList) { this.notifyValueChange(value); }
  /**
   * @description icon code from Google Fonts.
   */
  public defaultIconCode?: string;
  public tt?: FileList;

  ngOnInit(): void {
  }

  get accept(): string {
      switch (this.allowType) {
        case EFileType.All:
          this.defaultIconCode = 'attach_file';
          return '*';
        case EFileType.Image:
          this.defaultIconCode = 'image';
          return 'image/jpeg,image/jpg,image/png';
        case EFileType.Pdf:
          this.defaultIconCode = 'picture_as_pdf';
          return '.pdf';
        case EFileType.Excel:
          this.defaultIconCode = 'feed';
          return '.xls';
    }
  }

  public onFileSelected(event: Event): void {
    this.tt = (event.target as HTMLInputElement).files as FileList;
    this.uploadingFiles.emit(this.tt);
  }

}
