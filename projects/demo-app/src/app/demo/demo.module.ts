import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';

import {DynamicFormsModule, DynamicTableService} from 'ngx-dynamic-forms';
import {BasicFormsComponent} from './components/basic-forms/basic-forms.component';
import {TableFormsComponent} from './components/table-forms/table-forms.component';
import {DemoComponent} from './demo.component';
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {TableFormService} from "./services/table-form.service";

const routes: Routes = [
  {
    path: '',
    component: DemoComponent,
    children: [
      {path: '', redirectTo: 'basic', pathMatch: 'full'},
      {path: 'basic', component: BasicFormsComponent},
      {path: 'table', component: TableFormsComponent}
    ]
  }
];

@NgModule({
  declarations: [
    DemoComponent,
    BasicFormsComponent,
    TableFormsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    DynamicFormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatExpansionModule,
    MatSlideToggle
  ],
  providers: [
    // Provide concrete implementation for abstract service
    {provide: DynamicTableService, useClass: TableFormService}
  ]
})
export class DemoModule {
}