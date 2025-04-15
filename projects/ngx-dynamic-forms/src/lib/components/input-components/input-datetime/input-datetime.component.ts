import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import { FormElementDatetime } from '../../../form-classes';

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
