import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {InputControlService} from "./input-control.service";
import {BehaviorSubject, Observable} from "rxjs";
import {FormElementBase} from "../form-classes";
import {TableDebug, TableOptions} from "../interfaces";
import {FormElementCollection} from "../form-classes";

@Injectable({
  providedIn: 'root'
})
export abstract class DynamicTableService {

  // --- Dependencies --- //
  private _ics: InputControlService = inject(InputControlService);

  // --- Debug --- //
  public abstract debugMode: WritableSignal<boolean>;
  public tableDebug: TableDebug = {
    tableEditToken: false,
    localEditToken: false,
    logFormBtn: false,
  }

  public tableOptions: TableOptions = {
    editCol: true,
    newBtn: true,
    editBtn: true,
    deleteBtn: true
  }

  // --- Fields --- //
  protected abstract demoMode: boolean;
  protected demoData: any[] = [];

  public abstract tableName: string;
  public parentIdRequired: boolean = true;
  public parentId$?: Observable<number | null>;

  public abstract readOnly: WritableSignal<boolean>;
  public columnWidths: { [key: string]: string } = {};
  public columnAligns: { [key: string]: string } = {};
  public activeInputGroup: WritableSignal<string | null> = signal(null);


  // --- Selected row --- //
  protected _subject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public selectedRow$: Observable<any> = this._subject.asObservable();

  public setSelected(element: any | null): void {
    this._subject.next(element);
  };

  public setSelectedById(elementId: number): void {
    this.getById(elementId).subscribe(element => this.setSelected(element));
  };


  // --- ICS functions --- //
  // Hard-coded elements
  public abstract getElements(): FormElementBase[];

  // Turn hard-coded form elements info a form element collection (fec)
  public getFormElementCollection(setForm: boolean = true): FormElementCollection {
    return new FormElementCollection(this._ics, this.getElements(), setForm);
  }


  // --- API --- //
  public abstract getItems(parentId?: number): Observable<any[]>;

  public abstract getById(itemId: number): Observable<any>;

  public abstract upsertItem(item: any, parentId?: number): Observable<any>;

  public abstract deleteItem(item: any): Observable<boolean>;
}
