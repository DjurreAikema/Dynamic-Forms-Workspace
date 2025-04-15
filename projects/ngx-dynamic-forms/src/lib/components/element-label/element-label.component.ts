import {Component, Input} from '@angular/core';
import {LabelStyle} from "../../interfaces";
import {FormElementInputBase} from '../../form-classes';

@Component({
  selector: 'element-label',
  standalone: false,
  template: `
      <label class="element-label" [for]="element.key">
          {{ labelStyle.prefix }}{{ element.label }}{{ labelStyle.suffix }}
      </label>
  `,
  styles: [`
    .element-label {
      box-sizing: border-box;
      width: 100%;
    }
  `]
})
export class ElementLabelComponent {

  @Input({required: true}) element!: FormElementInputBase;
  @Input({required: true}) labelStyle!: LabelStyle;

}
