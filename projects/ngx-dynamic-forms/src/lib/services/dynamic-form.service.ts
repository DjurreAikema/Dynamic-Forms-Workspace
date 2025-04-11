import {effect, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {FormElementBase} from "../form-classes";
import {FormElementCollection} from "../form-classes";
import {InputControlService} from "./input-control.service";

@Injectable({
  providedIn: 'root'
})
export abstract class DynamicFormService {

  // --- Dependencies --- //
  private _ics: InputControlService = inject(InputControlService);


  // --- Fields --- //
  public abstract fec: FormElementCollection;

  public abstract debugMode: WritableSignal<boolean>;
  public abstract readOnly: WritableSignal<boolean>;

  public visibleGroups: WritableSignal<string[]> = signal<string[]>([]);


  protected constructor() {
    effect((): void => {
      const groups: string[] = this.visibleGroups();

      if (groups.length > 0) {
        this.fec.hideAll();
        groups.forEach((group: string) => this.fec.showGroup(group));
      } else {
        this.fec.showAll();
      }
    }, {allowSignalWrites: true});
  }


  // --- Form elements --- //
  // Hard-coded form elements
  protected abstract getElements(): FormElementBase[];

  // Turn hard-coded form elements info a form element collection (fec)
  protected getFormElementCollection(setForm: boolean = true): FormElementCollection {
    return new FormElementCollection(this._ics, this.getElements(), setForm);
  }

  // Reset form
  public resetForm(patchValue?: any): void {
    this.fec.resetForm(this.readOnly(), patchValue);
  }
}
