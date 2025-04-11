import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormElementSelectBase} from "../form-element-select-base";

export class FormElementTextSelect extends FormElementSelectBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.TEXT_SELECT;

}
