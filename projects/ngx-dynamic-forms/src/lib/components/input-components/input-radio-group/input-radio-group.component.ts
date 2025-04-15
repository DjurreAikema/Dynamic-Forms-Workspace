import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementRadioGroup} from '../../../form-classes';

@Component({
  selector: 'input-radio-group',
  standalone: false,
  template: `
      <mat-radio-group class="radio-group-input" *ngIf="element.controlType == ControlTypeEnum.RADIO_GROUP"
                       [formControl]="element.formControl" [id]="element.key"

                       [style.justify-content]="inputStyle.radioGroupJustifyContent">

          <mat-radio-button *ngFor="let radioOption of element.radioOptions" [value]="radioOption.value">{{ radioOption.label }}</mat-radio-button>

      </mat-radio-group>
  `,
  styles: [`
    .radio-group-input {
      box-sizing: border-box;

      width: 100%;
      overflow: hidden;

      display: flex;
      flex-flow: row nowrap;
    }
  `],
  styleUrls: ['../default-input.scss']
})
export class InputRadioGroupComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementRadioGroup;
  @Input({required: true}) inputStyle!: InputStyle;
}
