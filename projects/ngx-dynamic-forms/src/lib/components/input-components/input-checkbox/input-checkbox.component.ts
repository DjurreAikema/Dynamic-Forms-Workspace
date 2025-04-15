import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {FormElementCheckbox} from '../../../form-classes';
import {InputStyle} from '../../../interfaces';

@Component({
  selector: 'input-checkbox',
  standalone: false,
  template: `
      <mat-checkbox class="checkbox-input" *ngIf="element.controlType == ControlTypeEnum.CHECKBOX"
                    [formControl]="element.formControl" [id]="element.key"
                    [style.text-align]="inputStyle.checkboxAlign">
      </mat-checkbox>

      <!--    <input class="checkbox-input" *ngIf="element.controlType == ControlTypeEnum.CHECKBOX"-->
      <!--           [formControl]="element.formControl" [id]="element.key" [type]="element.controlType"-->
      <!--           [style.text-align]="inputStyle.checkboxAlign" [style.max-height]="inputStyle.maxHeight">-->
  `,
  styles: [`
    .checkbox-input {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
    }
  `]
})
export class InputCheckboxComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementCheckbox;
  @Input({required: true}) inputStyle!: InputStyle;
}
