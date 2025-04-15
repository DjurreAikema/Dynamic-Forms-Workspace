import {Component, OnInit} from '@angular/core';
import {BasicFormService} from '../../services/basic-form.service';
import {FormElementBase} from 'ngx-dynamic-forms';

@Component({
  selector: 'app-basic-forms',
  standalone: false,
  template: `
      <div class="basic-forms-container">
          <h2>Basic Form Elements</h2>

          <div class="controls">
              <mat-slide-toggle [checked]="debugMode()" (change)="toggleDebugMode()">
                  Debug Mode
              </mat-slide-toggle>

              <mat-slide-toggle [checked]="readOnly()" (change)="toggleReadOnly()">
                  Read Only
              </mat-slide-toggle>

              <button mat-raised-button color="primary" (click)="resetForm()">
                  Reset Form
              </button>

              <button mat-raised-button color="accent" (click)="submitForm()">
                  Submit Form
              </button>
          </div>

          <mat-card class="form-card">
              <mat-card-header>
                  <mat-card-title>Personal Information</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <div form-element-group
                       [elements]="getElementsByGroup('personalInfo')"
                       [debugMode]="debugMode()">
                  </div>
              </mat-card-content>
          </mat-card>

          <mat-card class="form-card">
              <mat-card-header>
                  <mat-card-title>Address Information</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <div form-element-group
                       [elements]="getElementsByGroup('address')"
                       [debugMode]="debugMode()">
                  </div>
              </mat-card-content>
          </mat-card>

          <mat-card class="form-card">
              <mat-card-header>
                  <mat-card-title>Preferences</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <div form-element-group
                       [elements]="getElementsByGroup('preferences')"
                       [debugMode]="debugMode()">
                  </div>
              </mat-card-content>
          </mat-card>

          <mat-card class="form-card">
              <mat-card-header>
                  <mat-card-title>Feedback</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                  <div form-element-group
                       [elements]="getElementsByGroup('feedback')"
                       [debugMode]="debugMode()">
                  </div>
              </mat-card-content>
          </mat-card>

          <mat-expansion-panel *ngIf="formValid() || debugMode()">
              <mat-expansion-panel-header>
                  <mat-panel-title>
                      Form Data
                  </mat-panel-title>
              </mat-expansion-panel-header>
              <pre>{{ formData | json }}</pre>
          </mat-expansion-panel>
      </div>
  `,
  styles: [`
    .basic-forms-container {
      max-width: 800px;
      margin: 0 auto;
    }

    .controls {
      display: flex;
      gap: 16px;
      margin-bottom: 20px;
      align-items: center;
    }

    .form-card {
      margin-bottom: 20px;
    }

    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
    }
  `]
})
export class BasicFormsComponent implements OnInit {
  formData: any = {};

  constructor(private formService: BasicFormService) {
  }

  ngOnInit() {
    this.resetForm();

    // Subscribe to form changes to update form data
    this.formService.fec.formGroup.valueChanges.subscribe(value => {
      this.formData = value;
    });
  }

  get debugMode() {
    return this.formService.debugMode;
  }

  get readOnly() {
    return this.formService.readOnly;
  }

  get formValid() {
    return this.formService.fec.formValid;
  }

  toggleDebugMode() {
    this.formService.debugMode.set(!this.formService.debugMode());
  }

  toggleReadOnly() {
    this.formService.readOnly.set(!this.formService.readOnly());

    if (this.formService.readOnly()) {
      this.formService.fec.disableAll();
    } else {
      this.formService.fec.enableAll();
    }
  }

  resetForm() {
    this.formService.resetForm({
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      subscribe: true
    });
  }

  submitForm() {
    if (this.formService.fec.formGroup.valid) {
      console.log('Form submitted:', this.formService.fec.getRawFormValue());
      alert('Form submitted successfully!');
    } else {
      console.error('Form is invalid');
      this.formService.fec.formGroup.markAllAsTouched();
    }
  }

  getElementsByGroup(group: string): FormElementBase[] {
    return this.formService.fec.getElementsByGroup(group) || [];
  }
}