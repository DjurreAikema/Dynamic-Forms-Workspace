import {ControlTypeEnum} from "../enums/control-type.enum";
import {FormControl} from "@angular/forms";

export class FormElementBase {

  public key: string;
  public controlType!: ControlTypeEnum;
  public formControl!: FormControl;

  public visible: boolean = true;

  constructor(
    key: string,
  ) {
    this.key = key;
  }

  public setVisible(visible: boolean) {
    this.visible = visible;
    return this;
  }

  public enable(): void {
    if (this.formControl) this.formControl.enable();
  }

  public disable(): void {
    if (this.formControl) this.formControl.disable();
  }

  public show(enable: boolean = true): void {
    this.visible = true;
    if (enable) this.enable();
  }

  public hide(disable: boolean = true): void {
    this.visible = false;
    if (disable) this.disable();
  }
}
