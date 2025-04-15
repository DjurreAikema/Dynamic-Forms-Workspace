import {Component, Input} from '@angular/core';
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {InputStyle} from '../../../interfaces';
import {FormElementIdSelect} from '../../../form-classes';

@Component({
  selector: 'input-id-select',
  standalone: false,
  template: `
      <mat-select class="element-input select-input" *ngIf="element.controlType == ControlTypeEnum.ID_SELECT"
                  [formControl]="element.formControl" [compareWith]="idSelectCompare"
                  [style.max-height]="inputStyle.maxHeight"
                  (openedChange)="IdSearch.value = ''" (opened)="IdSearch.focus()"

                  dfNoSpace>

          <!-- Search Bar -->
          <input class="select-search" id="id-search" type="text" placeholder="Zoeken...." autocomplete="off" #IdSearch>

          <!-- Options -->
          <mat-option class="select-option" *ngFor='let item of element.list$ | async | matSelectFilter: IdSearch.value : "searchValue"'
                      [value]="item.id">
              {{ item.searchValue }}
          </mat-option>
          <mat-option class="select-option" [value]="null">None</mat-option>

      </mat-select>
  `,
  styles: [],
  styleUrls: ['../default-input.scss', '../select-input.scss']
})
export class InputIdSelectComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementIdSelect;
  @Input({required: true}) inputStyle!: InputStyle;

  // Option = id of option in list, value = id of stored
  public idSelectCompare(option: number, value: number): boolean {
    return option == value;
  }
}
