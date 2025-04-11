import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormElementSelectBase} from "../form-element-select-base";

export class FormElementIdSelect extends FormElementSelectBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.ID_SELECT;

}
