import {
  AfterContentInit,
  AfterViewInit,
  Directive,
  OnChanges,
  OnInit,
  Input,
  SimpleChanges
} from "@angular/core";
import { User } from "@user/shared/models/user.model";
import { UnSubOnDestroy } from "@utility/abstract/unsubondestroy.abstract";

@Directive()
export class BaseComponent extends UnSubOnDestroy
  implements OnChanges, OnInit, AfterContentInit, AfterViewInit {
  @Input() user!: User;

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
