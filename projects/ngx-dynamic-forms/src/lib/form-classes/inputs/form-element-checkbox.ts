import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementCheckbox extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.CHECKBOX;
  public override value: boolean = false;

}
