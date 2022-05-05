import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { BaseComponent } from "@utility/base/base-component";
import { EModule } from "@utility/enum/route.enum";

@Directive()
export class BaseSubMenu extends BaseComponent {
  @Output() updateModule = new EventEmitter<EModule>();
}
