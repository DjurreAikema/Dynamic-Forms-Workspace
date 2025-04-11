import {Component, Input} from '@angular/core';
import {FormElementDate} from "ngx-dynamic-forms";
import {ControlTypeEnum} from "ngx-dynamic-forms";
import {InputStyle} from "ngx-dynamic-forms";

@Component({
  selector: 'input-date',
  standalone: false,
  template: `
      <input class="element-input" *ngIf="element.controlType == ControlTypeEnum.DATE"
             [formControl]="element.formControl" [id]="element.key" [type]="element.controlType"
             [style.max-height]="inputStyle.maxHeight"

             dfEmptyToNull>
  `,
  styles: [],
  styleUrls: ['../default-input.scss']
})
export class InputDateComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementDate;
  @Input({required: true}) inputStyle!: InputStyle;
}
