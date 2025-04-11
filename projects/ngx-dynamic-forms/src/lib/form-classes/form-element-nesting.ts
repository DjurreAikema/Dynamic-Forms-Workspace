import {FormElementBase} from "./form-element-base";
import {ControlTypeEnum} from "../enums/control-type.enum";

export class FormElementNesting extends FormElementBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.NESTING;
  public nested: FormElementBase[];

  constructor(
    key: string,
    nested: FormElementBase[],
  ) {
    super(key);

    this.nested = nested;
  }
}
