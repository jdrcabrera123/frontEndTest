import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[thousandMarks]',
})
export class ThousandMarksDirective {
  @HostListener('input', ['$event']) onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    // Remove existing thousand marks
    const cleanedValue = value.replace(/,/g, '');

    // Add thousand marks
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    inputElement.value = formattedValue;
  }
}
