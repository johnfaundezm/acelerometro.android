import { Component } from '@angular/core';

@Component({
  selector: 'poadmindep',
  templateUrl: 'poadmindep.html'
})
export class PoadmindepComponent {

  text: string;

  constructor() {
    console.log('Hello PoadmindepComponent Component');
    this.text = 'Hello World';
  }

}
