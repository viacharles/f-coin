import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  @ViewChild("tTextArea") tTextArea: ElementRef|null = null;
  constructor() { }

  public textContent = '';

  ngOnInit(): void {
  }

  get isAblePost(): boolean {
    return this.textContent !== '';
  }
}
