import { OverlayService } from '@shared/overlay/overlay.service';
import { EFileType } from '../../../../../utility/enum/file.enum';
import { Component, Input } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';

// file selector for only single file type

@Component({
  selector: 'app-file-select-icon',
  templateUrl: './select-file-icon.component.html',
  styleUrls: ['./select-file-icon.component.scss'],
  providers: [getFormProvider(SelectFileIconComponent)]
})
export class SelectFileIconComponent extends CustomForm<File[]> {
  @Input() isMultiple = true;
  @Input() allowType: EFileType = EFileType.Image;

  constructor(private $overlay: OverlayService) { super(); }

  get files(): File[] { return this.model as File[]; }
  set files(value: File[]) { this.notifyValueChange(value); }

  /**
   * @description icon code from Google Fonts.
   */
  public iconCode?: string;

  get acceptList(): string {
      switch (this.allowType) {
        case EFileType.Image:
          this.iconCode = 'image';
          return 'image/jpeg,image/jpg,image/png';
        case EFileType.Pdf:
          this.iconCode = 'picture_as_pdf';
          return '.pdf';
        case EFileType.Excel:
          this.iconCode = 'feed';
          return '.xls';
    }
  }

  public onFileSelected(event: Event): void {
    this.files = Array.from(((event.target as HTMLInputElement).files as FileList)) as File[];
  }

}
