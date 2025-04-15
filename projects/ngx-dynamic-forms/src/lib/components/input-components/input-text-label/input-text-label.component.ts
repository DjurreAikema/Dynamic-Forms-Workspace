import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementTextLabel} from '../../../form-classes';

@Component({
  selector: 'input-text-label',
  standalone: false,
  template: `
      <input class="text-label" *ngIf="element.controlType == ControlTypeEnum.TEXT_LABEL"
             [formControl]="element.formControl" [id]="element.key" [type]="element.controlType" [readOnly]="true"
             [style.max-height]="inputStyle.maxHeight"

             dfEmptyToNull>
  `,
  styles: [`
    .text-label {
      box-sizing: border-box;

      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: inherit;
      font-weight: bold;

      padding: 3px 15px;
    }

    .text-label[disabled] {
      background-color: transparent;
      color: black;
    }
  `],
  styleUrls: ['../default-input.scss']
})
export class InputTextLabelComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementTextLabel;
  @Input({required: true}) inputStyle!: InputStyle;
}
