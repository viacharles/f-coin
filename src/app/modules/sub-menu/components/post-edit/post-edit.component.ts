import { PostEditService } from './../../shared/services/post-edit.service';
import { Component, ViewChild, ElementRef, Input, ViewChildren, QueryList } from '@angular/core';
import { EFileType } from '@utility/enum/file.enum';
import { EPostEditAction as Action } from '@social/shared/models/posts.model';
import { User } from '@user/shared/models/user.model';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent {
  @ViewChildren('canvas') canvases?: QueryList<ElementRef<HTMLCanvasElement>>;
  @ViewChild('img') img?: ElementRef<HTMLImageElement>;
  @ViewChild('progress') progress?: ElementRef<HTMLProgressElement>;
  @Input() user?: User;
  constructor(private feature: PostEditService) {}

  public article = '';
  public selectedFiles: File[] = [];
  public selectedImages: string[] = [];
  public allows = [EFileType.Image];

  // <file-select-icon> custom settings ===
  public isMultiple = true;
  public allowType = EFileType.Image;

  public selectFiles(files: FileList): void {
    if (files.length > 0) {
      this.selectedFiles = Array.from(files);
      this.selectedFiles.forEach((file, index) => {
        this.loadToReader(file)
          .then((event) => this.setProgressBarValue(event))
          .then((event) => this.loadToImageHTML(event.target?.result as string))
          .then((img) => this.loadTo2DCanvas(img, this.canvases as QueryList<ElementRef<HTMLCanvasElement>>, index, 230, 127));
      });
    }
  }

  public cancelSelectFile(canvases: QueryList<ElementRef<HTMLCanvasElement>>, targetFile: File, targetIndex: number): void {
    console.log('selectedFiles', targetIndex, canvases.toArray())
    const canvas = canvases.toArray()[targetIndex].nativeElement;
    const context = canvas.getContext('2d');
    context?.clearRect(0, 0, canvas.width, canvas.height);
    this.selectedFiles.filter(file => {
      console.log('selectedFiles-filter', file.name !== targetFile.name)
      return file.name !== targetFile.name;
    });
    this.selectedImages.filter((image, index) => {
      return index !== targetIndex
    });
    console.log('cancelSelectFile', this.selectedFiles, this.selectedImages)
  }

  public post(): void {
    this.feature.fireEvent({
      action: Action.Post,
      fileType: EFileType.Image,
      article: this.article,
      files: this.selectedFiles,
      images: this.selectedImages,
      uid: this.user?.id as string
    });
  }

  /**
   * @description load files by FileReader.
   */
  private loadToReader(file: File): Promise<ProgressEvent<FileReader>> {
    return new Promise<ProgressEvent<FileReader>>((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: ProgressEvent<FileReader>) => { resolve(event); };
    });
  }

  private setProgressBarValue(event: ProgressEvent<FileReader>): Promise<ProgressEvent<FileReader>> {
    return new Promise<ProgressEvent<FileReader>>((resolve) => {
      const progress = (this.progress as ElementRef<HTMLProgressElement>).nativeElement;
      if (event.lengthComputable) {
        progress.value = event.loaded / event.total;
      }
      (event.target as FileReader).onloadend = () => { progress.value = 100; };
      resolve(event);
    });
  }

  /**
   * @description single file load to become image html/object Image.
   * @param fileCode url or base64 code for image.
   */
  private loadToImageHTML(fileCode: string, element?: ElementRef<HTMLImageElement>, width?: number, height?: number)
    : Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve) => {
      const img = element ? element.nativeElement : new Image(width, height);
      img.onload = () => {
        resolve(img);
      };
      img.src = fileCode;
    });
  }

  private loadTo2DCanvas(img: HTMLImageElement, canvases: QueryList<ElementRef<HTMLCanvasElement>>,
    index: number, width?: number, height?: number): void {
    const canvas = canvases.toArray()[index].nativeElement;
    const context = canvas.getContext('2d');
    if (width && height) { context?.drawImage(img, 0, 0, width, height); }
    else { context?.drawImage(img, 0, 0); }
    this.addSelectedImage(this.selectedImages, canvas.toDataURL());
  }

  private addSelectedImage(ImageArray: string[], dataUrl: string): void {
    ImageArray.push(dataUrl);
  }
}
