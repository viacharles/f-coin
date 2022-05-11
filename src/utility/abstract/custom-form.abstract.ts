import { forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { UnSubOnDestroy } from "./unsubondestroy.abstract";

/**
 * @description 獲得自製ngModel配置
 */
export function getFormProvider(component: any) {
    return {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => component),
        multi: true
    }
}

export abstract class CustomForm<T = any> extends UnSubOnDestroy implements ControlValueAccessor {
    constructor() {
        super();
    }

    public model: T | null = null;
    public disabled = false;
    private firstChange = true;

    private onChange: any;

    /**
     * @description 外部變更時觸發
     */
    writeValue(value: T): void {
        this.model = value;
        this.onModelChanged({
            value,
            isFirstChange: this.firstChange
        });
        this.firstChange = false;
    }

    /**
     * @description 內部變更時觸發
     */
    registerOnChange(fn: (value: any) => {}): void {
        this.onChange = fn;
    }

    registerOnTouched(): void { }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    protected notifyValueChange(value?: any) {
        if (this.onChange) {
            this.onChange(value || this.model);
        }
    }

    protected onModelChanged({ value, isFirstChange }: { value: T, isFirstChange: boolean }) {

    }

}
