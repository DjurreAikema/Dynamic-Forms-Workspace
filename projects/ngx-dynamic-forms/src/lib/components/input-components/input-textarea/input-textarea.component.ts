import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementTextarea} from '../../../form-classes';

@Component({
  selector: 'input-textarea',
  standalone: false,
  template: `
      <textarea class="element-input" *ngIf="element.controlType == ControlTypeEnum.TEXTAREA"
                [formControl]="element.formControl" [id]="element.key" [rows]="element.rows" [cols]="element.cols"
                [style.height]="inputStyle.maxHeight" [style.min-height]="inputStyle.maxHeight" [style.max-height]="inputStyle.maxHeightTextArea"

                dfEmptyToNull>
    </textarea>
  `,
  styles: [`
    textarea {
      resize: vertical;
      /*https://stackoverflow.com/questions/9382245/how-to-disable-textarea-resizing*/
    }
  `],
  styleUrls: ['../default-input.scss']
})
export class InputTextareaComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementTextarea;
  @Input({required: true}) inputStyle!: InputStyle;
}
