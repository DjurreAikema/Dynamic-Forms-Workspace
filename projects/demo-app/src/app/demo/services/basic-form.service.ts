import {Injectable, signal, WritableSignal} from '@angular/core';
import {of} from 'rxjs';
import {
  DynamicFormService,
  FormElementBase,
  FormElementCollection,
  FormElementText,
  FormElementNumber,
  FormElementDate,
  FormElementCheckbox,
  FormElementTextarea,
  FormElementRadioGroup,
  FormElementIdSelect,
  FormElementCodelistSelect,
  FormElementNesting,
  InputControlService
} from 'ngx-dynamic-forms';

@Injectable({
  providedIn: 'root'
})
export class BasicFormService extends DynamicFormService {
  public override fec: FormElementCollection;
  public override debugMode: WritableSignal<boolean> = signal(false);
  public override readOnly: WritableSignal<boolean> = signal(false);

  constructor(private inputControlService: InputControlService) {
    super();
    this.fec = this.getFormElementCollection();
  }

  protected override getElements(): FormElementBase[] {
    return [
      // Basic Input Types
      new FormElementText('firstName', 'First Name', 'personalInfo')
        .setValidators({required: true}),

      new FormElementText('lastName', 'Last Name', 'personalInfo')
        .setValidators({required: true}),

      new FormElementNumber('age', 'Age', 'personalInfo')
        .setValidators({min: 18, max: 100}),

      new FormElementDate('birthday', 'Birthday', 'personalInfo'),

      new FormElementCheckbox('subscribe', 'Subscribe to newsletter', 'preferences')
        .setValue(false),

      new FormElementTextarea('comments', 'Comments', 'feedback', {rows: 4})
        .setValidators({maxLength: 500}),

      // Radio Group Example
      new FormElementRadioGroup(
        'gender',
        'Gender',
        [
          {label: 'Male', value: 'male'},
          {label: 'Female', value: 'female'},
          {label: 'Other', value: 'other'}
        ],
        'personalInfo'
      ),

      // Select Examples
      new FormElementIdSelect(
        'country',
        'Country',
        of([
          {id: 1, name: 'United States', searchValue: 'United States'},
          {id: 2, name: 'Canada', searchValue: 'Canada'},
          {id: 3, name: 'United Kingdom', searchValue: 'United Kingdom'},
          {id: 4, name: 'Australia', searchValue: 'Australia'}
        ]),
        'address'
      ),

      new FormElementCodelistSelect(
        'language',
        'Preferred Language',
        of([
          {code: 'en', systeemOmschrijving: 'English', searchValue: 'en - English'},
          {code: 'fr', systeemOmschrijving: 'French', searchValue: 'fr - French'},
          {code: 'de', systeemOmschrijving: 'German', searchValue: 'de - German'},
          {code: 'es', systeemOmschrijving: 'Spanish', searchValue: 'es - Spanish'}
        ]),
        'preferences'
      ),

      // Nested Form Group Example
      new FormElementNesting('address', [
        new FormElementText('street', 'Street', 'address')
          .setValidators({required: true}),

        new FormElementText('city', 'City', 'address')
          .setValidators({required: true}),

        new FormElementText('zipCode', 'Zip Code', 'address')
          .setValidators({pattern: '^[0-9]{5}$'}),
      ])
    ];
  }
}