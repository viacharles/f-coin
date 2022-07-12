import { Directive, ElementRef, HostListener } from '@angular/core';
import { Listener } from 'selenium-webdriver';

@Directive({
  selector: '[appDropUpload]'
})
export class DropUploadDirective {

  constructor(selfElem: ElementRef) { }

  @HostListener('drag', ['$event']) ondragover(event: DragEvent): void {
    event.preventDefault();
    console.log('drag', event);
  }
  @HostListener('drop', ['$event']) ondrop(event: DragEvent): void {
    event.preventDefault();
    console.log('drop', event);
  }

}
