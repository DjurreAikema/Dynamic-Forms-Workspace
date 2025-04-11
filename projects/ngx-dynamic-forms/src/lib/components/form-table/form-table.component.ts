// noinspection AngularUndefinedTag
import {ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, signal, Signal} from '@angular/core';
import {ControlTypeEnum} from "../../enums/control-type.enum";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {DynamicTableService} from "../../services/dynamic-table.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormElementBase} from "../../form-classes";
import {InputStyle, RowStyle, TableRemove, TableStyle} from "../../interfaces";
import {TableRowStyle} from "../../interfaces";
import {FormElementCollection} from "../../form-classes";

@Component({
  selector: 'dynamic-form-table',
  standalone: false,
  template: `
      <div class="table-container">
          <table class="form-table"
                 [style.border]="tableStyle.border" [style.font-size]="tableStyle.fontSize" [style.color]="tableStyle.fontColor"
                 [style.background-color]="tableStyle.backgroundColor">


              <!-- Table Header -->
              <tr class="form-table-header"
                  [style.border]="tableStyle.border" [style.font-size]="tableStyle.headerFontSize" [style.color]="tableStyle.headerFontColor"
                  [style.background-color]="tableStyle.headerBackgroundColor">

                  <!-- Generated Header Columns -->
                  <ng-template [ngTemplateOutlet]="tableHeader"
                               [ngTemplateOutletContext]="{ headerElements: this.getFormElements(this.service.activeInputGroup(), this.service.getFormElementCollection()) }">
                  </ng-template>

                  <!-- Edit Column Header -->
                  <th class="header-edit-column" *ngIf="service.tableOptions.editCol"
                      [style.border]="tableStyle.border">

                      <div class="edit-column-new-btn">
                          <button class="new-button" *ngIf="service.tableOptions.newBtn" (click)="createRow()"
                                  [disabled]="tableEditToken || checkParentId(parentId) || service.readOnly() || disableNewBtn()">
                              <i class="fa-solid fa-plus"></i> Nieuw
                          </button>

                          <div *ngIf="service.tableDebug.tableEditToken" class="tableEditToken-debug">
                              TET: {{ tableEditToken }}
                          </div>
                      </div>

                  </th>

              </tr>


              <!-- Table Rows -->
              <tr form-table-row class="table-row" *ngFor="let itemAndFec of itemFecMap | keyvalue"
                  [item]="itemAndFec.key" [fec]="itemAndFec.value" [(tableEditToken)]="tableEditToken" [service]="service"
                  (remove)="removeRow($event)" (upsert)="upsertRow($event)"

                  [ngClass]="{'dynamic-table-active': (service.selectedRow$ | async)?.id == itemAndFec.key.id}"
                  (click)="(!tableEditToken ? service.setSelected(itemAndFec.key) : '')"

                  [inputRowStyle]="rowStyle" [inputStyle]="inputStyle" [tableRowStyle]="tableRowStyle"
                  [style.border]="tableStyle.border">
              </tr>

          </table>
      </div>


      <!-- Template for making headers recursively, this is needed because of nested elements -->
      <ng-template #tableHeader let-headerElements="headerElements">
          <ng-container *ngIf="checkIfHeaderHasElements(headerElements)"></ng-container>

          <ng-container *ngFor="let element of headerElements;">

              <!-- If the element is of type nesting, call this template again with the nested elements -->
              <ng-template *ngIf="element.controlType == ControlTypeEnum.NESTING"
                           [ngTemplateOutlet]="tableHeader" [ngTemplateOutletContext]="{ headerElements: element.nested }"></ng-template>

              <!-- If the element is not nested, create table headers -->
              <th class="header-column" *ngIf="element.controlType != ControlTypeEnum.NESTING && element.controlType != ControlTypeEnum.HIDDEN"
                  [style.border]="tableStyle.border" [style.padding]="tableStyle.headerPadding"
                  [style.width]="service.columnWidths[element.key] != null ? service.columnWidths[element.key] : ''"
                  [style.text-align]="service.columnAligns[element.key] != null ? service.columnAligns[element.key] : ''">
                  {{ element.label }}
              </th>

          </ng-container>
      </ng-template>
  `,
  styleUrls: ['form-table.scss']
})
export class FormTableComponent implements OnInit, OnDestroy {

  // --- Dependencies --- //
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _snackBar: MatSnackBar = inject(MatSnackBar);
  private _fb: FormBuilder = inject(FormBuilder);


  // --- Internal Form array --- //
  private _internalFormArray!: FormArray;
  private _subscriptions: { [key: string]: Subscription } = {};

  set formArray(formArray: FormArray) {
    this._internalFormArray = formArray;

    if (this._subscriptions["formArrayChanges"]) {
      this._subscriptions["formArrayChanges"].unsubscribe();
    }
    // this will work around the change detection on push limitations
    this._subscriptions["formArrayChanges"] = this.formArray.valueChanges
      .subscribe(() => this._cdr.detectChanges());
  }

  get formArray() {
    return this._internalFormArray;
  }


  // --- Inputs/Outputs --- //
  @Input() tableStyle: TableStyle = {
    border: "1px solid rgb(200, 200, 200)",

    fontSize: "12px",
    fontColor: "black",
    backgroundColor: "white",

    headerBackgroundColor: "rgb(44, 44, 44)",
    headerFontSize: "14px",
    headerFontColor: "white",
    headerPadding: "10px"
  }

  @Input() tableRowStyle: TableRowStyle = {
    padding: '5px'
  }

  // --- Row style options
  @Input() rowStyle: RowStyle = {
    flexFlow: 'row nowrap',
    gap: '0',

    fontSize: '12px',
    fontColor: 'black'
  }

  // --- Input style options
  @Input() inputStyle: InputStyle = {
    flex: '2',
    checkboxAlign: 'center',
    radioGroupJustifyContent: 'space-evenly'
  }

  @Input({required: true}) service!: DynamicTableService;
  @Input() disableNewBtn: Signal<boolean> = signal<boolean>(false);

  @Output() itemCount: EventEmitter<number> = new EventEmitter<number>();
  @Output() hideTable: EventEmitter<boolean> = new EventEmitter<boolean>();


  // --- Fields --- //
  protected readonly ControlTypeEnum = ControlTypeEnum;

  public itemFecMap: Map<any, FormElementCollection>;
  public tableEditToken: boolean = false;
  public parentId: number | undefined;


  // --- Lifecycle hooks --- //
  constructor() {
    this.formArray = this._fb.array([]);
    this.itemFecMap = new Map<any, FormElementCollection>();
  }

  ngOnInit(): void {
    if (this.service.parentId$)
      this._subscriptions["parentChanges"] = this.service.parentId$.subscribe((parentId: number | null): void => {
        if (parentId) this.parentId = parentId;
        this.load();
      });
  }

  ngOnDestroy(): void {
    this.service.setSelected(null);
    Object.keys(this._subscriptions).forEach((sk: string) => this._subscriptions[sk].unsubscribe());
  }


  protected getFormElements(activeInputGroup: string | null, fec: FormElementCollection): FormElementBase[] {
    if (activeInputGroup != null)
      return fec.getElementsByGroup(activeInputGroup)!;

    return fec.formElements;
  }

  protected checkIfHeaderHasElements(headerElements: FormElementBase[] | undefined): boolean {
    if (!headerElements) this.hideTable.emit(true);
    else this.hideTable.emit(false);

    return false;
  }

  // Check if parent id is needed
  protected checkParentId(parentId: number | undefined): boolean {
    if (!this.service.parentIdRequired)
      return false
    else if (parentId)
      return false

    return true
  }


  // --- Get Elements --- //
  public load(): void {
    // Set the array to an empty array
    this.formArray = this._fb.array([]);
    this.itemFecMap = new Map<any, FormElementCollection>([]);

    // Fill the array
    if (this.parentId) this.itemsToFormElementCollection(this.parentId);
    else this.itemsToFormElementCollection();

    // The table should never be in edit mode after loading
    this.tableEditToken = false;
  }

  private itemsToFormElementCollection(parentId?: number): void {
    // Get all the items
    this.service.getItems(parentId).subscribe((items: any): void => {
      // Create a FEC for each item. Add the FEC FormGroup to the FormArray and then add the FEC and the item to a map
      items.forEach((item: any): void => {
        const fec: FormElementCollection = this.service.getFormElementCollection();
        this.formArray.push(fec.formGroup);

        // This map is used to create the table rows and pass the correct item with the FormGroup
        this.itemFecMap.set(item, fec);
      });

      // Emit how many items are in the table
      this.itemCount.emit(this.formArray.length);
    });
  }


  // --- Edit Functions --- //
  public createRow(): void {
    // Create an FEC
    const newFec: FormElementCollection = this.service.getFormElementCollection();
    // Add the FEC FormGroup to the FormArray
    this.formArray.push(newFec.formGroup);
    // Add the FEC to the Map with an empty item
    // A new FEC must be upserted or deleted upon which the items will be reloaded
    this.itemFecMap.set({}, newFec);

    // Table is set to edit mode when a new row is created
    this.tableEditToken = true;
    // Emit how many items are in the table
    this.itemCount.emit(this.formArray.length);
  }

  // Upsert the FormGroup
  public upsertRow(formGroup: FormGroup): void {
    this.service.upsertItem(formGroup.getRawValue(), this.parentId)
      .subscribe((res): void => {
        this.service.setSelectedById(res);
        this.load();
        this.openSnackbar('Item bijgewerkt', "X");
      });
  }

  public removeRow(remove: TableRemove): void {
    // Remove the FormGroup from the FormArray
    const fec: FormElementCollection | undefined = this.itemFecMap.get(remove.item);
    if (fec) this.formArray.removeAt(this.formArray.controls.indexOf(fec.formGroup));
    this.itemFecMap.delete(remove.item);
    this.service.setSelected(null);

    // Check if the Id is filled before deleting in case a new row is deleted before it was upserted
    if (remove.itemId) {
      this.service.deleteItem(remove.itemId).subscribe((): void => {
        this.load();
      });
    } else this.tableEditToken = false;

    this.openSnackbar('Item verwijdert', "X");
  }


  // --- Snackbar --- //
  private openSnackbar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 3500,
      panelClass: 'snackbar-success'
    });
  }
}
