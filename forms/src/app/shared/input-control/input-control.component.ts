import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputControlComponent),
  multi: true
};

@Component({
  selector: 'app-input-control',
  templateUrl: './input-control.component.html',
  styleUrls: ['./input-control.component.css'],
  providers: [INPUT_CONTROL_VALUE_ACCESSOR]
})
export class InputControlComponent implements ControlValueAccessor {
  @Input() classeCss: any;
  @Input() id!: string;
  @Input() label!: string;
  @Input() type = 'text';
  @Input() control: any;
  @Input() readonly = false;
  @Input() placeholder: string = '';

  private innerValue: any;

  get value() {
    return this.innerValue;
  }
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onChangeCallback: (_: any) => void = () => {};
  onTouchedCallback: (_: any) => void = () => {};

  writeValue(v: any): void {
    this.value = v;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.readonly = isDisabled;
  }
}
