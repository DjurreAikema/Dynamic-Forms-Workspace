import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementDate extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.DATE;

}
