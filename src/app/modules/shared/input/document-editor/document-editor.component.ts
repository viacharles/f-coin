import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';
import * as Editor from './ckeditor';
import { ClassicEditor } from './ckeditor';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  providers: [getFormProvider(DocumentEditorComponent)]
})
export class DocumentEditorComponent extends CustomForm<string> implements AfterViewInit  {
@ViewChild('ckEditor') ckEditor?: ElementRef;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
      this.setFormAttr();
  }

  public editor = Editor;

  get article(): string { return this.model as string; }

  set article(article: string) {
    this.notifyValueChange(this.formatHtml(article));
  }

  public formatHtml(content: string): string {
    return content.replace(/<strong>/g, `<strong style = "font-weight: bold">`);
  }

  private setFormAttr(): void {
  //   ClassicEditor
  //     .creat( this.ckEditor , {
  //       placeholder: '輸入說明文字...'
  //     });
  }
}
