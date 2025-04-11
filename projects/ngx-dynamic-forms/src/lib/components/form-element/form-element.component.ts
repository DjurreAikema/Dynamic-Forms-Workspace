import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from "ngx-dynamic-forms";
import {
  FormElementCheckbox,
  FormElementCodelistSelect,
  FormElementDate,
  FormElementDatetime,
  FormElementIdSelect,
  FormElementInputBase,
  FormElementNumber,
  FormElementObjectSelect,
  FormElementRadioGroup,
  FormElementText,
  FormElementTextarea,
  FormElementTextLabel
} from "ngx-dynamic-forms";
import {InputStyle, LabelStyle, RowStyle} from "../../interfaces";

@Component({
  selector: 'form-element',
  standalone: false,
  templateUrl: './form-element.component.html',
  styleUrls: ['./form-element.component.scss']
})
export class FormElementComponent {

  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementInputBase;
  @Input({required: true}) debugMode!: boolean;
  @Input({required: true}) rowStyle!: RowStyle;
  @Input({required: true}) labelStyle!: LabelStyle;
  @Input({required: true}) inputStyle!: InputStyle;

  @Input() noLabel: boolean = false;


  // --- Convert to the correct element --- //
  protected toText(element: FormElementInputBase): FormElementText {
    return element as FormElementText;
  }

  protected toNumber(element: FormElementInputBase): FormElementNumber {
    return element as FormElementNumber;
  }

  protected toDatetime(element: FormElementInputBase): FormElementDatetime {
    return element as FormElementDatetime;
  }

  protected toDate(element: FormElementInputBase): FormElementDate {
    return element as FormElementDate;
  }

  protected toTextLabel(element: FormElementInputBase): FormElementTextLabel {
    return element as FormElementTextLabel;
  }

  protected toTextarea(element: FormElementInputBase): FormElementTextarea {
    return element as FormElementTextarea;
  }

  protected toCheckbox(element: FormElementInputBase): FormElementCheckbox {
    return element as FormElementCheckbox;
  }

  protected toRadioGroup(element: FormElementInputBase): FormElementRadioGroup {
    return element as FormElementRadioGroup;
  }

  protected toIdSelect(element: FormElementInputBase): FormElementIdSelect {
    return element as FormElementIdSelect;
  }

  protected toObjectSelect(element: FormElementInputBase): FormElementObjectSelect {
    return element as FormElementObjectSelect;
  }

  protected toCodeListSelect(element: FormElementInputBase): FormElementCodelistSelect {
    return element as FormElementCodelistSelect;
  }
}
