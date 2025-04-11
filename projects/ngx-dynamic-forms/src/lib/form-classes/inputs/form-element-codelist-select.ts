import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormElementSelectBase} from "../form-element-select-base";

export class FormElementCodelistSelect extends FormElementSelectBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.CODELIST_SELECT;

}
