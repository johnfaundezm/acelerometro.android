import { Component } from '@angular/core';

@Component({
  selector: 'poadminent',
  templateUrl: 'poadminent.html'
})
export class PoadminentComponent {

  text: string;

  constructor() {
    console.log('Hello PoadminentComponent Component');
    this.text = 'Hello World';
  }

}
