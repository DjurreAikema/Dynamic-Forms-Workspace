import {Injectable, signal, WritableSignal} from '@angular/core';
import {Observable, of} from 'rxjs';
import {
  DynamicTableService,
  FormElementBase,
  FormElementText,
  FormElementNumber,
  FormElementDate,
  FormElementCheckbox,
  InputControlService
} from 'ngx-dynamic-forms';

@Injectable({
  providedIn: 'root',
})
export class TableFormService extends DynamicTableService {
  public override tableName: string = 'Users Table';
  public override debugMode: WritableSignal<boolean> = signal(false);
  public override readOnly: WritableSignal<boolean> = signal(false);
  protected override demoMode: boolean = true;

  constructor(private inputControlService: InputControlService) {
    super();

    // Set up demo data
    this.demoData = [
      {id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', age: 32, active: true, hireDate: '2020-05-12'},
      {id: 2, firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', age: 28, active: true, hireDate: '2021-02-18'},
      {id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob@example.com', age: 45, active: false, hireDate: '2018-11-03'}
    ];

    // Configure column widths
    this.columnWidths = {
      firstName: '15%',
      lastName: '15%',
      email: '25%',
      age: '10%',
      active: '10%',
      hireDate: '15%'
    };

    // Configure column alignment
    this.columnAligns = {
      age: 'center',
      active: 'center'
    };
  }

  public override getElements(): FormElementBase[] {
    return [
      new FormElementNumber('id', 'ID')
        .setVisible(false),

      new FormElementText('firstName', 'First Name')
        .setValidators({required: true}),

      new FormElementText('lastName', 'Last Name')
        .setValidators({required: true}),

      new FormElementText('email', 'Email')
        .setValidators({required: true, email: true}),

      new FormElementNumber('age', 'Age')
        .setValidators({min: 18, max: 100}),

      new FormElementCheckbox('active', 'Active')
        .setValue(true),

      new FormElementDate('hireDate', 'Hire Date')
        .setValidators({required: true})
    ];
  }

  public override getItems(parentId?: number): Observable<any[]> {
    // In a real application, this would be an API call
    return of(this.demoData);
  }

  public override getById(itemId: number): Observable<any> {
    // In a real application, this would be an API call
    const item = this.demoData.find(i => i.id === itemId);
    return of(item || null);
  }

  public override upsertItem(item: any, parentId?: number): Observable<any> {
    // In a real application, this would be an API call
    if (item.id) {
      // Update existing item
      const index = this.demoData.findIndex(i => i.id === item.id);
      if (index >= 0) {
        this.demoData[index] = {...item};
      }
    } else {
      // Create new item
      const newId = Math.max(...this.demoData.map(i => i.id), 0) + 1;
      const newItem = {...item, id: newId};
      this.demoData.push(newItem);
      item = newItem;
    }
    return of(item.id);
  }

  public override deleteItem(itemId: number): Observable<boolean> {
    // In a real application, this would be an API call
    const index = this.demoData.findIndex(i => i.id === itemId);
    if (index >= 0) {
      this.demoData.splice(index, 1);
      return of(true);
    }
    return of(false);
  }
}