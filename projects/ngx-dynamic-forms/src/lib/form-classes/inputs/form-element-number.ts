import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementNumber extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.NUMBER;

}
