import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormElementSelectBase} from "../form-element-select-base";

export class FormElementObjectSelect extends FormElementSelectBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.OBJECT_SELECT;

}
