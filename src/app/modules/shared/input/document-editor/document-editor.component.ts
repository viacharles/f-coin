import { Component, OnInit } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';
import * as Editor from './ckeditor';

@Component({
  selector: 'app-document-editor',
  templateUrl: './document-editor.component.html',
  styleUrls: ['./document-editor.component.scss'],
  providers: [getFormProvider(DocumentEditorComponent)]
})
export class DocumentEditorComponent extends CustomForm<string>  {

  constructor() {
    super();
  }

  public editor = Editor;

  get article(): string { return this.model as string; }

  set article(article: string) {
    this.notifyValueChange(this.formatHtml(article));
  }

  public formatHtml(content: string): string {
    return content.replace(/<strong>/g, `<strong style = "font-weight: bold">`);
  }


}
