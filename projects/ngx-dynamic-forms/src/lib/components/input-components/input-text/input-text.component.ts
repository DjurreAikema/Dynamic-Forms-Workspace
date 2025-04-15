import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementText} from '../../../form-classes';

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
