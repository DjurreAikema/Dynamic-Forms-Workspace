import {FormElementBase} from "./form-element-base";
import {DynamicValidators} from "../interfaces";

export class FormElementInputBase extends FormElementBase {

  public label: string;
  public validators: DynamicValidators = {};

  public inputGroup?: string | string[];
  public value?: any;

  constructor(
    key: string,
    label: string,
    inputGroup?: null | string | string[],
  ) {
    super(key);

    this.label = label;

    if (inputGroup) this.inputGroup = inputGroup;
  }

  public setValidators(validators: DynamicValidators) {
    this.validators = validators;
    return this;
  }

  public setValue(value: any) {
    this.value = value;
    if (this.formControl) this.formControl.setValue(value);
    return this;
  }

  // Check if the value of the element matches the given value
  public valueEquals(value: any): boolean {
    const elementValue: any = this.value || this.formControl?.value;
    return !!(elementValue && elementValue === value);
  }
}
