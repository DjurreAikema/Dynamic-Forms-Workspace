import {Component} from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: false,
  template: `
      <div class="demo-container">
          <mat-toolbar color="primary" class="demo-toolbar">
              <span>ngx-dynamic-forms Demo</span>
          </mat-toolbar>

          <div class="demo-content">
              <mat-tab-group>
                  <mat-tab label="Basic Forms">
                      <div class="tab-content">
                          <app-basic-forms/>
                      </div>
                  </mat-tab>
                  <mat-tab label="Table Forms">
                      <div class="tab-content">
                          <app-table-forms/>
                      </div>
                  </mat-tab>
              </mat-tab-group>
          </div>
      </div>
  `,
  styles: [`
    .demo-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }

    .demo-toolbar {
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }

    .tab-content {
      padding: 20px 0;
    }
  `]
})
export class DemoComponent {
}
