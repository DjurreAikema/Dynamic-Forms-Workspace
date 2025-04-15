import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementNumber} from '../../../form-classes';

@Component({
  selector: 'input-number',
  standalone: false,
  template: `
      <input class="element-input" *ngIf="element.controlType == ControlTypeEnum.NUMBER"
             [formControl]="element.formControl" [id]="element.key" [type]="element.controlType"
             [style.max-height]="inputStyle.maxHeight"

             dfEmptyToNull>
  `,
  styles: [],
  styleUrls: ['../default-input.scss']
})
export class InputNumberComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementNumber;
  @Input({required: true}) inputStyle!: InputStyle;
}
