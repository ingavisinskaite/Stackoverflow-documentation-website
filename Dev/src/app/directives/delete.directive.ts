import { Observable, Subject, interval } from 'rxjs';
import { Directive, HostListener, EventEmitter, Output } from '@angular/core';
import { takeUntil, tap, filter } from 'rxjs/operators';

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  @Output() holdTime

  constructor() { }

}
