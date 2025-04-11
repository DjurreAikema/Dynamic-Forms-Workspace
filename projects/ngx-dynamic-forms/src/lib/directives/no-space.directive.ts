import {Directive, EventEmitter, Output, Self} from '@angular/core';
import {MatSelect} from "@angular/material/select";

@Directive({
  selector: '[dfNoSpace]',
  standalone: false,
})
export class NoSpaceDirective {
  @Output('spacekeydown') spacekeydown: EventEmitter<any> = new EventEmitter<any>();

  constructor(@Self() private select: MatSelect) {

    // Override the default `_handleKeydown` method of the `MatSelect` component
    this.select._handleKeydown = (event: KeyboardEvent): void => {
      if (event.code == "Space") {

        // Get the currently active option (if the panel is open) or null (if the panel is closed)
        const active = this.select.panelOpen ? this.select.options.filter(x => x.active)[0] || null : null

        // Emit an event with the value of the active option, or null if there is no active option
        this.spacekeydown.emit(active ? active.value : null);

      } else {

        if (!this.select.disabled) {
          // If the panel is open, handle the keydown event for open panels
          // Otherwise, handle the keydown event for closed panels
          this.select.panelOpen
            ? (this.select as any)._handleOpenKeydown(event)
            : (this.select as any)._handleClosedKeydown(event);
        }
      }
    };
  }

}
