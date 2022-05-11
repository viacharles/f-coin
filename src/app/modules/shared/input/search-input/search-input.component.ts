import { Component, ElementRef, EventEmitter, Output } from '@angular/core';
import { CustomForm, getFormProvider } from '@utility/abstract/custom-form.abstract';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [getFormProvider(SearchInputComponent)]
})
export class SearchInputComponent extends CustomForm<string> {
  @Output() keydown = new EventEmitter<KeyboardEvent>();
  get value(): string { return this.model as string; }
  set value(input: string) {
    this.model = input;
    this.notifyValueChange();
  }

  public isShow = false;
  private listener!: any;

  constructor(
    private element: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.listener = document.addEventListener('click', this.detectClickTarget.bind(this));
  }

  private detectClickTarget({ target }: MouseEvent) {
    this.isShow = this.element.nativeElement.contains(target);
  }

  OnDestroy() {
    document.removeEventListener('click', this.listener);
  }

}
