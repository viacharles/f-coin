import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.scss']
})
export class UploadDialogComponent implements OnInit {

  public count = 0;
  public fileTypeCode = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
