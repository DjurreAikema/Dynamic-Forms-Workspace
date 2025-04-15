// noinspection AngularUndefinedTag
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {InputStyle, LabelStyle, RowStyle, TableRemove, TableRowStyle} from "../../interfaces";
import {DynamicTableService} from '../../services/dynamic-table.service';
import {FormElementBase, FormElementCollection} from '../../form-classes';
import {ControlTypeEnum} from '../../enums/control-type.enum';

@Component({
  selector: '[form-table-row]',
  standalone: false,
  template: `
      <ng-template
              [ngTemplateOutlet]="tableRow" [ngTemplateOutletContext]="{ rowFormElements: getFormElements(service.activeInputGroup()), rowEdit: true }">
      </ng-template>


      <!-- Table row template -->
      <ng-template #tableRow let-rowFormElements="rowFormElements" let-rowEdit=rowEdit>

          <ng-container *ngFor="let rowFormElement of rowFormElements; trackBy: trackByFn">

              <!-- Call template again for nested controls -->
              <ng-template *ngIf="rowFormElement.controlType == ControlTypeEnum.NESTING"
                           [ngTemplateOutlet]="tableRow" [ngTemplateOutletContext]="{ rowFormElements: rowFormElement.nested, rowEdit: false}">
              </ng-template>

              <!-- Input -->
              <td class="row-column" *ngIf="rowFormElement.controlType != ControlTypeEnum.NESTING && rowFormElement.controlType != ControlTypeEnum.HIDDEN"
                  [style.padding]="tableRowStyle.padding">
                  <form-element [element]="rowFormElement" [noLabel]="true" [rowStyle]="inputRowStyle" [labelStyle]="labelStyle" [inputStyle]="inputStyle"
                                [debugMode]="service.debugMode()"></form-element>
              </td>

          </ng-container>


          <!-- Edit buttons column -->
          <td class="row-edit-column" *ngIf="rowEdit && service.tableOptions.editCol"
              [style.padding]="tableRowStyle.padding">

              <!-- Buttons -->
              <div class="row-edit-column-buttons">

                  <!-- Toggle edit btn -->
                  <ng-container *ngIf="!localEditToken && service.tableOptions.editBtn; else saveBtn">
                      <button class="table-row-success-btn" (click)="toggleEdit($event)"
                              [disabled]="tableEditToken || service.readOnly()">
                          <i class="fa-solid fa-pen"></i>
                      </button>
                  </ng-container>

                  <!-- Upsert btn -->
                  <ng-template #saveBtn>
                      <ng-container *ngIf="service.tableOptions.editBtn">
                          <button class="table-row-success-btn" (click)="upsertRow(fec.formGroup, $event)"
                                  [disabled]="!fec.formGroup.valid || service.readOnly()">
                              <i class="fa-solid fa-floppy-disk"></i>
                          </button>
                      </ng-container>
                  </ng-template>

                  <!-- Delete btn -->
                  <button class="table-row-danger-btn" *ngIf="service.tableOptions.deleteBtn" (click)="removeRow($event)"
                          [disabled]="(tableEditToken && !localEditToken) || service.readOnly()">
                      <i class="fa-solid fa-trash"></i>
                  </button>

                  <!-- Log form btn -->
                  <button class="standard-button ml-5" *ngIf="service.tableDebug.logFormBtn"
                          (click)="logRowForm(fec.formGroup, $event)">
                      <i class="fa-solid fa-right-from-bracket"></i>
                  </button>
              </div>


              <!-- Debug info -->
              <ng-container class="localEditToken-debug" *ngIf="service.tableDebug.localEditToken">
                  LET: {{ localEditToken }}
              </ng-container>

          </td>

      </ng-template>
  `,
  styles: [],
  styleUrls: ['form-table-row.scss']
})
export class FormTableRowComponent implements OnInit {

  // --- Table row style options
  @Input({required: true}) tableRowStyle!: TableRowStyle;

  // --- Input row style options
  @Input({required: true}) inputRowStyle!: RowStyle;

  // --- Input style options
  @Input({required: true}) inputStyle!: InputStyle;

  // --- Input Label style options
  @Input() labelStyle: LabelStyle = {
    flex: '',
    suffix: ''
  }


  // --- Inputs/Outputs --- //
  @Input({required: true}) tableEditToken: boolean = false;
  @Input({required: true}) service!: DynamicTableService;
  @Input({required: true}) fec!: FormElementCollection;
  @Input({required: true}) item: any;

  @Output() tableEditTokenChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() remove: EventEmitter<TableRemove> = new EventEmitter<TableRemove>();
  @Output() upsert: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();


  // --- Fields --- //
  public localEditToken: boolean = false;
  protected readonly ControlTypeEnum = ControlTypeEnum;


  ngOnInit(): void {
    // If an item is passed, patch the item into the FormGroup
    if (this.item != null) this.fec.formGroup.patchValue(this.item);

    // Get the Id property from the form. If Id doesn't have a value it's a new row and should be editable.
    const rowId: number | null = this.fec.getElementValueByKey('id');
    if (!rowId) this.localEditToken = true;

    this.enableOrDisableRow();
  }

  protected getFormElements(activeInputGroup: string | null): FormElementBase[] {
    if (activeInputGroup != null)
      return this.fec.getElementsByGroup(activeInputGroup)!;

    return this.fec.formElements;
  }

  private enableOrDisableRow(): void {
    // If readOnly = true
    // Or tableEditToken = false
    // Or tableEditToken = true And localEditToken = false
    if (this.service.readOnly() || !this.tableEditToken || (this.tableEditToken && !this.localEditToken))
      this.fec.disableAll();

    // If readOnly = false And localEditToken = true
    if (!this.service.readOnly() && this.localEditToken)
      this.fec.enableAll();
  }


  // --- Edit Functions --- //
  protected toggleEdit($event: MouseEvent): void {
    this.defaultHandler($event, true);
  }

  // Tell the table to upsert the changes made to the rowForm
  protected upsertRow(rowForm: FormGroup, $event: MouseEvent): void {
    this.defaultHandler($event, false);
    this.upsert.emit(rowForm);
  }

  // Tell the table to remove the row from the FormArray
  protected removeRow($event: MouseEvent): void {
    $event.stopPropagation();
    this.remove.emit({item: this.item, itemId: this.fec.getElementValueByKey('id')});
  }

  // Update the local and table edit tokens to prevent multiple rows from being edited at the same time
  private defaultHandler($event: MouseEvent, isEdit: boolean): void {
    $event.stopPropagation();
    this.localEditToken = isEdit;
    this.tableEditTokenChange.emit(isEdit);
    this.enableOrDisableRow();
  }

  public trackByFn(index: any): void {
    return index;
  }

  protected logRowForm(rowForm: any, $event: MouseEvent): void {
    $event.preventDefault();
    console.log(rowForm);
  }
}
