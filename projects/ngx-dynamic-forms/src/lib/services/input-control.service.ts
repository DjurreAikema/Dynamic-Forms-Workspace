import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ControlTypeEnum} from "../enums/control-type.enum";
import {FormElementBase, FormElementInputBase, FormElementNesting} from "../form-classes";

@Injectable({
  providedIn: 'root'
})
export class InputControlService {

  public toFormGroup(elements: FormElementBase[], existingNestedControls?: any): FormGroup {

    // If nested is an existing form group add to that, else create new group
    const group: any = existingNestedControls ? existingNestedControls : {};

    elements.forEach((element: FormElementBase): void => {
      if (element.controlType == ControlTypeEnum.NESTING) {
        const nestElement: FormElementNesting = element as FormElementNesting;

        // Check if nested group exists, create new group if it doesn't
        if (group[nestElement.key]) this.toFormGroup(nestElement.nested, group[nestElement.key].controls);
        else group[nestElement.key] = this.toFormGroup(nestElement.nested);

      } else {
        const inputElement: FormElementInputBase = element as FormElementInputBase;

        // Create form control
        group[inputElement.key] = new FormControl(inputElement.value);

        // Manage validators
        if (inputElement.validators.email) group[inputElement.key].addValidators(Validators.email);
        if (inputElement.validators.required) group[inputElement.key].addValidators(Validators.required);
        if (inputElement.validators.min) group[inputElement.key].addValidators(Validators.min(inputElement.validators.min));
        if (inputElement.validators.max) group[inputElement.key].addValidators(Validators.max(inputElement.validators.max));
        if (inputElement.validators.pattern) group[inputElement.key].addValidators(Validators.pattern(inputElement.validators.pattern));
        if (inputElement.validators.minLength) group[inputElement.key].addValidators(Validators.minLength(inputElement.validators.minLength));
        if (inputElement.validators.maxLength) group[inputElement.key].addValidators(Validators.maxLength(inputElement.validators.maxLength));

        inputElement.formControl = group[inputElement.key];
        if (inputElement.controlType == ControlTypeEnum.HIDDEN) inputElement.formControl?.disable();
      }
    });

    return new FormGroup(group);
  }
}
