import { Component } from '@angular/core';

/**
 * Generated class for the PopovercoachComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'popovercoach',
  templateUrl: 'popovercoach.html'
})
export class PopovercoachComponent {

  text: string;

  constructor() {
    console.log('Hello PopovercoachComponent Component');
    this.text = 'Hello World';
  }

}
