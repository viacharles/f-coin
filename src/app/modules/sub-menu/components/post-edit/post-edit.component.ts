import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  constructor() { }

  public textContent = 'test';

  ngOnInit(): void {
  }

  public show(value: any) {
    console.log(value);
  }

}
