import {Component, Input} from '@angular/core';
import {FormElementDatetime} from "ngx-dynamic-forms";
import {ControlTypeEnum} from "ngx-dynamic-forms";
import {InputStyle} from "ngx-dynamic-forms";

@Component({
  selector: 'input-datetime',
  standalone: false,
  template: `
      <input class="element-input" *ngIf="element.controlType == ControlTypeEnum.DATETIME"
             [formControl]="element.formControl" [id]="element.key" [type]="element.controlType"
             [style.max-height]="inputStyle.maxHeight"

             dfEmptyToNull>
  `,
  styles: [],
  styleUrls: ['../default-input.scss']
})
export class InputDatetimeComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementDatetime;
  @Input({required: true}) inputStyle!: InputStyle;
}
