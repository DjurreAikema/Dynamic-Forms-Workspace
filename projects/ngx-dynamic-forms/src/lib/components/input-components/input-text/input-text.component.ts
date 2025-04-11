import {Component, Input} from '@angular/core';
import {FormElementText} from "ngx-dynamic-forms";
import {ControlTypeEnum} from "ngx-dynamic-forms";
import {InputStyle} from "ngx-dynamic-forms";

@Component({
  selector: 'input-text',
  standalone: false,
  template: `
      <input class="element-input" *ngIf="element.controlType == ControlTypeEnum.TEXT"
             [formControl]="element.formControl" [id]="element.key" [type]="element.controlType"
             [style.max-height]="inputStyle.maxHeight"

             dfEmptyToNull>
  `,
  styles: [],
  styleUrls: ['../default-input.scss']
})
export class InputTextComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementText;
  @Input({required: true}) inputStyle!: InputStyle;
}
