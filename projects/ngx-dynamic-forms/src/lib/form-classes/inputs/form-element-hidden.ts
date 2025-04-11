import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementHidden extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.HIDDEN;

  constructor(
    key: string,
    inputGroup?: null | string | string[],
  ) {
    super(key, '', inputGroup);
  }
}
