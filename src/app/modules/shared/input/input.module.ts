import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentEditorComponent } from './document-editor/document-editor.component';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileSelectorComponent } from './file-selector/file-selector.component';
import { FileSelectIconComponent } from './file-select-icon/file-select-icon.component';
import { SearchInputComponent } from './search-input/search-input.component';



@NgModule({
  declarations: [
    DocumentEditorComponent,
    FileSelectorComponent,
    FileSelectIconComponent,
    SearchInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule
  ],
  exports: [
    DocumentEditorComponent,
    FileSelectorComponent,
    FileSelectIconComponent,
    SearchInputComponent
  ]
})
export class InputModule { }
