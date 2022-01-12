import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';



@NgModule({
  declarations: [DocumentEditorComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    DocumentEditorComponent
  ]
})
export class InputModule { }
