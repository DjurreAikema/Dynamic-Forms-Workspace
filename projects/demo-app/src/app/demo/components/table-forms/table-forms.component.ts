import {Component} from '@angular/core';
import {DynamicTableService} from "ngx-dynamic-forms";

@Component({
  selector: 'app-table-forms',
  standalone: false,
  template: `
      <div class="table-forms-container">
          <h2>Dynamic Table Example</h2>

          <div class="controls">
              <mat-slide-toggle [checked]="debugMode()" (change)="toggleDebugMode()">
                  Debug Mode
              </mat-slide-toggle>

              <mat-slide-toggle [checked]="readOnly()" (change)="toggleReadOnly()">
                  Read Only
              </mat-slide-toggle>

              <button mat-raised-button color="accent" (click)="reloadTable()">
                  Reload Table
              </button>
          </div>

          <mat-card>
              <mat-card-header>
                  <mat-card-title>{{ tableService.tableName }}</mat-card-title>
                  <mat-card-subtitle>
                      Total Items: {{ itemCount }}
                  </mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                  <dynamic-form-table
                          [service]="tableService"
                          (itemCount)="updateItemCount($event)"
                          (hideTable)="hideTable = $event">
                  </dynamic-form-table>

                  <div *ngIf="hideTable" class="no-data">
                      No data available
                  </div>
              </mat-card-content>
          </mat-card>

          <mat-expansion-panel *ngIf="selectedRow">
              <mat-expansion-panel-header>
                  <mat-panel-title>
                      Selected Row
                  </mat-panel-title>
              </mat-expansion-panel-header>
              <pre>{{ selectedRow | json }}</pre>
          </mat-expansion-panel>
      </div>
  `,
  styles: [`
    .table-forms-container {
      max-width: 1000px;
      margin: 0 auto;
    }

    .controls {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;
    }

    .no-data {
      padding: 20px;
      text-align: center;
      color: rgba(0, 0, 0, 0.54);
    }

    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class TableFormsComponent {
  itemCount: number = 0;
  hideTable: boolean = false;
  selectedRow: any = null;

  constructor(public tableService: DynamicTableService) {
    // Subscribe to selected row changes
    this.tableService.selectedRow$.subscribe(row => {
      this.selectedRow = row;
    });
  }

  get debugMode() {
    return this.tableService.debugMode;
  }

  get readOnly() {
    return this.tableService.readOnly;
  }

  toggleDebugMode() {
    this.tableService.debugMode.set(!this.tableService.debugMode());
  }

  toggleReadOnly() {
    this.tableService.readOnly.set(!this.tableService.readOnly());
  }

  reloadTable() {
    const tableElement = document.querySelector('dynamic-form-table') as any;
    if (tableElement && tableElement.load) {
      tableElement.load();
    }
  }

  updateItemCount(count: number) {
    this.itemCount = count;
  }
}