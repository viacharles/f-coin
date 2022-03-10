import { Directive, EventEmitter, Input, Output } from "@angular/core";
import { User } from "@user/shared/models/user.model";
import { BaseComponent } from "@utility/base/base-component";
import { EModule } from "@utility/enum/route.enum";

@Directive()
export class BaseSubMenu extends BaseComponent {
  @Input() user?: User;
  @Output() updateModule = new EventEmitter<EModule>();
}
