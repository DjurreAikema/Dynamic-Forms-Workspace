import {FormElementInputBase} from "../form-element-input-base";
import {ControlTypeEnum} from "../../enums/control-type.enum";
import {DynamicRadioOptions} from "../../interfaces";

export class FormElementRadioGroup extends FormElementInputBase {

  public override controlType: ControlTypeEnum = ControlTypeEnum.RADIO_GROUP;

  public radioOptions?: DynamicRadioOptions[];

  constructor(
    key: string,
    label: string,
    radioOptions: DynamicRadioOptions[],
    inputGroup?: null | string | string[]
  ) {
    super(key, label, inputGroup);
    this.radioOptions = radioOptions;
  }
}
