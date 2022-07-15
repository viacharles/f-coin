import { DialogComponent } from '@shared/overlay/dialog/dialog.component';
import { OverlayService } from '@shared/overlay/overlay.service';
import { BaseDialog } from '@utility/base/base-dialog';
import { Component, OnInit } from '@angular/core';
import { IUploadDialog } from '@utility/interface/common.interface';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent extends BaseDialog<IUploadDialog> implements OnInit {

  public files: File[] = Array.from(this.config?.files as FileList);
  get count(): number {return this.files.length; }

  constructor(public $overlay: OverlayService, public dialog: DialogComponent)
  { super($overlay, dialog); }

  ngOnInit(): void {
    console.log('aa-', this.files);
  }

  /**
   * @description get the name of the google icon by different file extension
   */
  public getIcon(file: File): string {
    return /\.(doc|txt)$/.test(file.name) ? 'description' :
          /\.pdf$/.test(file.name) ? 'picture_as_pdf' :
          /\.xls$/.test(file.name) ? 'view_list' :
          /\.(7z|zip)$/.test(file.name) ? 'folder_zip' :
          /\.(mov|mp4|avi)$/.test(file.name) ? 'videocam' :
          /\.(jpeg|jpg|png|gif)$/.test(file.name) ? '' 
          : 'text_snippet';
  }

  public formatBase64(file: File, elem: HTMLImageElement): string {
    let base64 = ''
    if (/\.(jpeg|jpg|png|gif)$/.test(file.name)) {
      const Reader = new FileReader();
      Reader.readAsDataURL(file);
      Reader.onload = () => {
        base64 = Reader.result as string;
        console.log('aa-img', elem.complete)
      };
    }
    return base64;
  }

  public delete(targetIndex: number): void {
    this.files = this.files.filter((file, index) => {
      return (index !== targetIndex); } );
  }

  public getSize(file: File): string {
    const SizeKB = file.size / 1024;
    return (SizeKB / 1024 >= 1)
            ? `${Math.round(SizeKB / 1024 * 10) / 10}MB`
            : `${Math.floor(SizeKB)}KB`;
  }

  public getName(file: File): string {
    const Name = file.name.split('.');
    Name.pop();
    return Name.join();
  }

  public getType(file: File): string {
    return (file.name.match(/\.[^\.]+$/i) as RegExpMatchArray)[0];
  }

  private getBase64(file: File): string {
    const Reader = new FileReader();
    let Base64 = '';
    Reader.readAsDataURL(file);
    Reader.onloadend = () => {Base64 = (Reader.result as string); };
    return Base64;
  }
}
