import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormElementBase} from "../../form-classes";
import {GroupStyle, InputStyle, LabelStyle, RowStyle} from "../../interfaces";

@Component({
  selector: '[form-element-group]',
  standalone: false,
  template: `
      <form class="element-group" autocomplete="off"
            [style.flex-flow]="groupStyle.flexFlow" [style.gap]="groupStyle.gap">

          <!-- Call the template with the elements that were provided -->
          <ng-template [ngTemplateOutlet]="elementRows" [ngTemplateOutletContext]="{templateElements: elements}"></ng-template>

      </form>


      <!-- Template for making rows recursively, this is needed because of nested elements -->
      <ng-template #elementRows let-templateElements="templateElements">

          <ng-container *ngFor="let element of templateElements; trackBy: trackByFn">

              <!-- If the element is of type nesting, call this template again with the nested elements -->
              <ng-template *ngIf="element.controlType == ControlTypeEnum.NESTING"
                           [ngTemplateOutlet]="elementRows" [ngTemplateOutletContext]="{templateElements: element.nested}">
              </ng-template>

              <!-- If the element is not nested, create a row -->
              <form-element *ngIf="element.controlType != ControlTypeEnum.NESTING" [element]="element"
                            [rowStyle]="rowStyle" [labelStyle]="labelStyle" [inputStyle]="inputStyle"
                            [ngStyle]="{'display': (element.controlType == ControlTypeEnum.HIDDEN && !debugMode) ? 'none' : ''}"
                            [debugMode]="debugMode">
              </form-element>

          </ng-container>

      </ng-template>
  `,
  styles: [`
    .element-group {
      box-sizing: border-box;
      display: flex;
    }
  `]
})
export class FormElementGroupComponent {

  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) elements!: FormElementBase[];
  @Input() debugMode: boolean = false;

  // --- Group style options
  @Input() groupStyle: GroupStyle = {
    flexFlow: 'column nowrap',
    gap: '3px'
  }

  // --- Row style options
  @Input() rowStyle: RowStyle = {
    flexFlow: 'row nowrap',
    gap: '5px',

    fontSize: '12px',
    fontColor: 'black'
  }

  // --- Label style options
  @Input() labelStyle: LabelStyle = {
    flex: '1',
    suffix: ':'
  }

  // --- Input style options
  @Input() inputStyle: InputStyle = {
    flex: '2',
    checkboxAlign: 'center',
    radioGroupJustifyContent: 'space-evenly',
    maxHeight: '28px'
  }

  // https://angular.io/api/core/TrackByFunction
  public trackByFn(index: any): void {
    return index;
  }
}
