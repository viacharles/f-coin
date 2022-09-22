import { Component, EventEmitter, Input, Output, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { IDialog } from '@utility/interface/overlay.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements IDialog, OnInit {
  @Output() close = new EventEmitter<void>();
  @Input() isMiniWindow = false;
  public id: any;
  public params: any;
  public component: any;
  constructor(private selfElem: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.isMiniWindow) {
      this.renderer.setStyle(this.selfElem.nativeElement, 'border-radius', '15px');
    }
  }
}
