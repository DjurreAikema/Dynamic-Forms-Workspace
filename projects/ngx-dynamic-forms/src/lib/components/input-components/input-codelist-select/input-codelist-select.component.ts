import {Component, Input} from '@angular/core';
import {Observable} from "rxjs";
import {ControlTypeEnum} from '../../../enums/control-type.enum';
import {FormElementCodelistSelect} from '../../../form-classes';
import {InputStyle} from '../../../interfaces';

@Component({
  selector: 'input-codelist-select',
  standalone: false,
  template: `
      <mat-select class="element-input" *ngIf="element.controlType == ControlTypeEnum.CODELIST_SELECT"
                  [formControl]="element.formControl" [compareWith]="idSelectCompare"
                  [style.max-height]="inputStyle.maxHeight"
                  (openedChange)="CodelistSearch.value = ''" (opened)="iOpened = true; CodelistSearch.focus()"

                  dfNoSpace>

          <!-- Search Bar -->
          <input class="select-search" id="codelist-search" type="text" placeholder="Zoeken...." autocomplete="off" #CodelistSearch>

          <!-- Options -->
          <ng-container *ngIf="element.list$ | async as list">
              <mat-option class="select-option" *ngFor='let item of iOpened
                    ? (list | matSelectFilter: CodelistSearch.value: "searchValue")
                    : getSpecificCode(list, element.formControl.getRawValue())'
                          [value]="item.code" (onSelectionChange)="onOptionChange(item, element.list$)">
                  {{ item.searchValue }}
              </mat-option>
          </ng-container>
          <mat-option class="select-option" [value]="null">None</mat-option>

      </mat-select>
  `,
  styles: [],
  styleUrls: ['../default-input.scss', '../select-input.scss']
})
export class InputCodelistSelectComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementCodelistSelect;
  @Input({required: true}) inputStyle!: InputStyle;

  public iOpened: boolean = false

  // Option = id of option in list, value = id of stored
  public idSelectCompare(option: number, value: number): boolean {
    return option == value;
  }

  // Get specific code from list to render only the selected code
  public getSpecificCode(list: any[], rawValue: any): any[] {
    return list.filter(code => code.code == rawValue);
  }

  // Add a new option to the list
  public onOptionChange(item: any, list?: Observable<any[]>): void {

    if (list) list.subscribe((items: any[]): void => {
      if (!items.some(option => option.code == item.code)) {
        items.push({
          code: item.code,
          systeemOmschrijving: item.systeemOmschrijving,
          searchValue: item.code + ' - ' + item.systeemOmschrijving
        });
        // TODO Emit item added
      }
    });
  }
}
