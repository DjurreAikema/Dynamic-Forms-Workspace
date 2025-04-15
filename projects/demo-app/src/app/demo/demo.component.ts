import {Component} from '@angular/core';

@Component({
  selector: 'app-demo',
  standalone: false,
  template: `
      <div class="demo-container">
          <mat-toolbar color="primary" class="demo-toolbar">
              <span class="nav-logo">ngx-dynamic-forms Demo</span>
              <span class="nav-button" [routerLink]="'basic'">Basic Forms</span>
              <span class="nav-button" [routerLink]="'table'">Table Forms</span>
          </mat-toolbar>

          <div class="demo-body">
              <router-outlet/>
          </div>

      </div>
  `,
  styles: [`
    .demo-container {
      height: 100%;
      display: grid;

      grid-template-columns: minmax(0, 1fr);
      grid-template-rows: 60px minmax(0, 1fr);
      gap: 5px;

      grid-template-areas:
        "demo-toolbar"
        "demo-body";
    }

    .demo-toolbar {
      grid-area: demo-toolbar;
      
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .demo-body {
      grid-area: demo-body;
      overflow: auto;
    }
    
    .demo-content {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }

    .tab-content {
      padding: 20px 0;
    }

    // --- Nav bar items --- //
    .nav-button {
      height: 100%;
      padding: 0 20px;

      text-decoration: none;
      color: white;

      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      
      border-right: 1px solid lightgrey;
      border-left: 1px solid lightgrey;
    }

    .nav-button:hover {
      background-color: rgb(17, 17, 17);
      cursor: pointer;
    }
    
    .nav-logo {
      margin-right: 50px;
    }
  `]
})
export class DemoComponent {
}
