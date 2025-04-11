import {InputControlService} from "../services/input-control.service";
import {Directive, OnDestroy, signal, WritableSignal} from "@angular/core";
import {map, Observable, Subscription} from "rxjs";
import {FormControlStatus, FormGroup} from "@angular/forms";
import {FormElementBase} from "./form-element-base";
import {ControlTypeEnum} from "../enums/control-type.enum";
import {FormElementNesting} from "./form-element-nesting";
import {FormElementInputBase} from "./form-element-input-base";
import {FormElementSelectBase} from "./form-element-select-base";

@Directive()
export class FormElementCollection implements OnDestroy {

  constructor(
    private _ics: InputControlService,
    formElements: FormElementBase[],
    setFrom: boolean
  ) {
    this.setFormElements(formElements, setFrom);
  }


  // --- Form group fields --- //
  public formGroup: FormGroup = new FormGroup({});
  private formChangesSub: Subscription = new Subscription();
  public readonly formValid: WritableSignal<boolean> = signal(false);
  public readonly formPristine: WritableSignal<boolean> = signal(false);


  // --- Form group functions --- //
  public ngOnDestroy(): void {
    this.formChangesSub.unsubscribe();
  }

  // Turn form elements into a FormGroup
  private elementsToFormGroup(elements: FormElementBase[]): void {
    this.formGroup = this._ics.toFormGroup(elements);
  }

  // Patch form value
  public patchForm(value: any): void {
    this.formGroup.patchValue(value);
  }

  // Patch form group value
  public patchFormGroup(formGroupName: string, value: any): void {
    const formGroup: FormGroup | null = this.formGroup.get(formGroupName) as FormGroup;
    formGroup.patchValue(value);
  }

  // Get form value
  public getFormValue(): FormGroup {
    return this.formGroup.value;
  }

  // Get raw form value
  public getRawFormValue(): FormGroup {
    return this.formGroup.getRawValue();
  }

  // Get value from a form group
  public getFormGroupValue(formGroupName: string): FormGroup | null {
    const formGroup: FormGroup | null = this.formGroup.get(formGroupName) as FormGroup;
    if (formGroup) return formGroup.value;
    return null;
  }

  // Get raw value from a form group
  public getRawFormGroupValue(formGroupName: string): FormGroup | null {
    const formGroup: FormGroup | null = this.formGroup.get(formGroupName) as FormGroup;
    if (formGroup) return formGroup.getRawValue();
    return null;
  }

  // Give access to status changes observable
  public getFormStatusChanges(): Observable<FormControlStatus> {
    return this.formGroup.statusChanges;
  }

  public setDirty(): void {
    this.formGroup.markAsDirty();
  }

  // Reset the form back to its initial state
  public resetForm(readOnly: boolean, patchValue?: any): void {
    this.elementsToFormGroup(this.formElements);

    this.formChangesSub = this.formGroup.statusChanges.subscribe((): void => {
      this.formValid.set(this.formGroup.valid);
      this.formPristine.set(this.formGroup.pristine);
    });

    if (patchValue) this.patchForm(patchValue);
    if (readOnly) this.disableAll();

    this.elementsByKey = new Map<string, FormElementBase>();
    this.elementsByGroup = new Map<string, FormElementBase[]>();
    this.mapElements();
  }


  // --- Form element fields --- //
  public formElements: FormElementBase[] = [];
  public elementsByKey: Map<string, FormElementBase> = new Map<string, FormElementBase>();
  public elementsByGroup: Map<string, FormElementBase[]> = new Map<string, FormElementBase[]>();


  // --- Form element functions --- //
  public setFormElements(formElements: FormElementBase[], setForm: boolean = true): void {
    this.formElements = formElements;
    this.mapElements();

    if (setForm) this.elementsToFormGroup(this.formElements);
  }

  // Get an element by its key
  public getElementByKey(key: string): FormElementBase | undefined {
    return this.elementsByKey.get(key);
  }

  // Get the value of an element by its key
  public getElementValueByKey(key: string): any {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (!element || !element.formControl) return null;

    return element.formControl.value;
  }

  // Set the value of an element by its key
  public setElementValueByKey(key: string, value: any): void {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (!element || !element.formControl) return;

    element.formControl.setValue(value);
  }

  public elementValueEquals(key: string, value: any): boolean {
    const element: FormElementInputBase | undefined = this.getElementByKey(key) as FormElementInputBase;
    if (!element || !element.formControl) return false;

    return element.valueEquals(value);
  }

  public filterElementList(key: string, property: any, value: any): void {
    const element: FormElementSelectBase | undefined = this.getElementByKey(key) as FormElementSelectBase;
    if (!element || !element.list$) return;

    element.list$ = element.list$.pipe(
      map((items: any[]) => items.filter((item: any): boolean => item[property] == value))
    );
  }

  // Get all elements
  public getAllElements(): FormElementBase[] {
    return [...this.elementsByKey.values()];
  }

  // Get all elements in the given group
  public getElementsByGroup(group: string, visibleOnly: boolean = true): FormElementBase[] | undefined {
    // Get elements by their group
    const elements: FormElementBase[] | undefined = this.elementsByGroup.get(group);
    if (!elements) return elements;

    // Return only elements set to visible
    if (visibleOnly)
      return elements.filter((element: FormElementBase): boolean => element.visible);

    return elements;
  }

  // Enable element by its key
  public enableByKey(key: string): void {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (element) element.enable();
  }

  // Enable all elements
  public enableAll(): void {
    this.elementsByKey.forEach((element: FormElementBase): void => element.enable());
  }

  // Enable all elements in a group
  public enableGroup(group: string): void {
    const elements: FormElementBase[] | undefined = this.elementsByGroup.get(group);
    if (elements) elements.forEach((element: FormElementBase) => element.enable());
  }

  // Disable element by its key
  public disableByKey(key: string): void {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (element) element.disable();
  }

  // Disable all elements
  public disableAll(): void {
    this.elementsByKey.forEach((element: FormElementBase): void => element.disable());
  }

  // Disable all elements in a group
  public disableGroup(group: string): void {
    const elements: FormElementBase[] | undefined = this.elementsByGroup.get(group);
    if (elements) elements.forEach((element: FormElementBase) => element.disable());
  }

  // Show an element by its key
  public showElementByKey(key: string, enable: boolean = true): void {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (element) element.show(enable);
  }

  // Show all elements
  public showAll(enable: boolean = true): void {
    this.elementsByKey.forEach((element: FormElementBase): void => element.show(enable));
  }

  // Show all elements in a group
  public showGroup(group: string, enable: boolean = true): void {
    const elements: FormElementBase[] | undefined = this.elementsByGroup.get(group);
    if (elements) elements.forEach((element: FormElementBase) => element.show(enable));
  }

  // Hide an element by its key
  public hideElementByKey(key: string, disable: boolean = true): void {
    const element: FormElementBase | undefined = this.getElementByKey(key);
    if (element) element.hide(disable);
  }

  // Hide all elements
  public hideAll(disable: boolean = true): void {
    this.elementsByKey.forEach((element: FormElementBase): void => element.hide(disable));
  }

  // Hide all elements in a group
  public hideGroup(group: string, disable: boolean = true): void {
    const elements: FormElementBase[] | undefined = this.elementsByGroup.get(group);
    if (elements) elements.forEach((element: FormElementBase) => element.hide(disable));
  }


  // --- Map form element functions --- //
  private mapElements(elements: FormElementBase[] = this.formElements, inputPath: string = ''): void {
    elements.forEach((element: FormElementBase): void => {

      // If the element has nested elements, call this function again with an updated inputPath
      if (element.controlType == ControlTypeEnum.NESTING) {
        const nestElement: FormElementNesting = element as FormElementNesting;
        this.mapElements(nestElement.nested, nestElement.key + '.');
      } else {
        const inputElement: FormElementInputBase = element as FormElementInputBase;

        // Add the element to the elementsByKey map
        this.elementsByKey.set(inputPath + inputElement.key, inputElement);

        // If the element doesn't have an inputGroup skip the next section
        if (!inputElement.inputGroup) return;

        // Add the element to the group map for each group its in
        if (Array.isArray(inputElement.inputGroup))
          inputElement.inputGroup.forEach((inputGroup: string) => this.mapElementByGroup(inputGroup, inputElement));
        else
          this.mapElementByGroup(inputElement.inputGroup, inputElement);
      }
    });
  }

  private mapElementByGroup(inputGroup: string, element: FormElementInputBase): void {
    // Either add the element to an existing map key, or create a new one
    if (this.elementsByGroup.has(inputGroup))
      this.elementsByGroup.get(inputGroup)!.push(element);
    else
      this.elementsByGroup.set(inputGroup, [element]);
  }


  // --- Debug --- //
  public logFormGroup(): void {
    console.log(this.formGroup);
  }
}
