import {Component, Input} from '@angular/core';
import {FormElementObjectSelect} from "ngx-dynamic-forms";
import {ControlTypeEnum} from "ngx-dynamic-forms";
import {InputStyle} from "ngx-dynamic-forms";

@Component({
  selector: 'input-object-select',
  standalone: false,
  template: `
      <mat-select class="element-input select-input" *ngIf="element.controlType == ControlTypeEnum.OBJECT_SELECT"
                  [formControl]="element.formControl" [compareWith]="objectSelectCompare"
                  [style.max-height]="inputStyle.maxHeight"
                  (openedChange)="ObjectSearch.value = ''" (opened)="ObjectSearch.focus()"

                  dfNoSpace>

          <!-- Search Bar -->
          <input class="select-search" id="object-search" type="text" placeholder="Zoeken...." autocomplete="off" #ObjectSearch>

          <!-- Options -->
          <mat-option class="select-option" *ngFor='let item of element.list$ | async | matSelectFilter: ObjectSearch.value : "searchValue"'
                      [value]="item.id">
              {{ item.searchValue }}
          </mat-option>
          <mat-option class="select-option" [value]="null">None</mat-option>

      </mat-select>
  `,
  styles: [],
  styleUrls: ['../default-input.scss', '../select-input.scss']
})
export class InputObjectSelectComponent {
  protected readonly ControlTypeEnum = ControlTypeEnum;

  @Input({required: true}) element!: FormElementObjectSelect;
  @Input({required: true}) inputStyle!: InputStyle;

  // Compare two objects assuming they both have an id
  public objectSelectCompare(option: any, value: any): boolean {
    return option == value;
  }
}
