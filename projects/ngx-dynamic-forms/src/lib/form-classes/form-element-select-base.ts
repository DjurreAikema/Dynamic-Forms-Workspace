import {FormElementInputBase} from "./form-element-input-base";
import {map, Observable} from "rxjs";

export class FormElementSelectBase extends FormElementInputBase {

  public list$: Observable<any>;

  constructor(
    key: string,
    label: string,
    list$: Observable<any>,
    inputGroup?: null | string | string[],
  ) {
    super(key, label, inputGroup)
    this.list$ = list$;
  }

  public filterList(property: any, value: any): void {
    this.list$ = this.list$.pipe(
      map(items => items.filter((item: any): boolean => item[property] == value))
    );
  }
}
