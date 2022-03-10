import {
  AfterContentInit,
  AfterViewInit,
  Injectable,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { UnSubOnDestroy } from "@utility/abstract/unsubondestroy.abstract";

@Injectable()
export class BaseComponent extends UnSubOnDestroy
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit {

  constructor() { super(); }

  ngOnChanges(changes: SimpleChanges): void {
    this.onChanges(changes);
  }
  ngOnInit(): void {
    this.onInit();
  }
  ngAfterContentInit(): void {
    this.afterContentInit();
  }
  ngAfterViewInit(): void {
    this.afterViewInit();
  }

  protected onChanges(changes: SimpleChanges): void { }
  protected onInit(): void { }
  protected afterContentInit(): void { }
  protected afterViewInit(): void { }

}
