import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { SelectFileIconComponent } from './select-file-icon/select-file-icon.component';



@NgModule({
  declarations: [DocumentEditorComponent, FileSelectorComponent, SelectFileIconComponent],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    DocumentEditorComponent,
    FileSelectorComponent,
    SelectFileIconComponent
  ]
})
export class InputModule { }
