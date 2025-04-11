import {Directive, HostListener, Self} from '@angular/core';
import {NgControl} from "@angular/forms";

@Directive({
  selector: '[dfEmptyToNull]',
  standalone: false,
})
export class EmptyToNullDirective {

  constructor(@Self() private ngControl: NgControl) {
  }

  @HostListener('keyup', ['$event']) onKeyDowns(): void {
    if (this.ngControl.value?.trim() === '') this.ngControl.reset(null);
  }

}
