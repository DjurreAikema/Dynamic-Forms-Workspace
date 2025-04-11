import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";

export class FormElementTextLabel extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.TEXT_LABEL;

}
