import {NgModule} from '@angular/core';
import {FormElementGroupComponent} from './components/form-element-group/form-element-group.component';
import {ElementLabelComponent} from './components/element-label/element-label.component';
import {CommonModule} from "@angular/common";
import {InputTextLabelComponent} from './components/input-components/input-text-label/input-text-label.component';
import {InputTextareaComponent} from './components/input-components/input-textarea/input-textarea.component';
import {InputCheckboxComponent} from './components/input-components/input-checkbox/input-checkbox.component';
import {InputRadioGroupComponent} from './components/input-components/input-radio-group/input-radio-group.component';
import {InputIdSelectComponent} from './components/input-components/input-id-select/input-id-select.component';
import {InputObjectSelectComponent} from './components/input-components/input-object-select/input-object-select.component';
import {InputCodelistSelectComponent} from './components/input-components/input-codelist-select/input-codelist-select.component';
import {InputTextComponent} from './components/input-components/input-text/input-text.component';
import {InputNumberComponent} from './components/input-components/input-number/input-number.component';
import {InputDatetimeComponent} from './components/input-components/input-datetime/input-datetime.component';
import {InputDateComponent} from './components/input-components/input-date/input-date.component';
import {MatSelectFilterPipe} from './pipes/mat-select-filter.pipe';
import {ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {FormElementComponent} from "./components/form-element/form-element.component";
import {FormTableComponent} from './components/form-table/form-table.component';
import {FormTableRowComponent} from './components/form-table-row/form-table-row.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {EmptyToNullDirective} from './directives/empty-to-null.directive';
import {NoSpaceDirective} from './directives/no-space.directive';

@NgModule({
  declarations: [
    // Components
    FormElementGroupComponent,
    FormElementComponent,
    ElementLabelComponent,
    InputTextLabelComponent,
    InputTextareaComponent,
    InputCheckboxComponent,
    InputRadioGroupComponent,
    InputIdSelectComponent,
    InputObjectSelectComponent,
    InputCodelistSelectComponent,
    InputTextComponent,
    InputNumberComponent,
    InputDatetimeComponent,
    InputDateComponent,
    FormTableComponent,
    FormTableRowComponent,
    // Directives
    EmptyToNullDirective,
    NoSpaceDirective,
    // Pipes
    MatSelectFilterPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  exports: [
    FormElementGroupComponent,
    FormTableComponent
  ]
})
export class DynamicFormsModule {
}
