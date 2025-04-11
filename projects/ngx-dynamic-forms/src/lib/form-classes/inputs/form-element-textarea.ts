import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementTextarea extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.TEXTAREA;

  public rows?: number;
  public cols?: number;

  constructor(
    key: string,
    label: string,
    inputGroup?: null | string | string[],
    options: {
      rows?: number;
      cols?: number;
    } = {},
  ) {
    super(key, label, inputGroup);

    if (options.cols) this.cols = options.cols;
    if (options.rows) this.rows = options.rows;
  }
}
