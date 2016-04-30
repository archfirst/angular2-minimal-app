import {Component} from 'angular2/core';

const INIT_VALUE = 1;
const MAX_VALUE = 4;

@Component({
  selector: 'my-app',
  moduleId: module.id,
  templateUrl: './app.component.html'
})
export class AppComponent {
    value: number;

    constructor() {
        this.value = INIT_VALUE;
    }

    increment() {
        if (this.value < MAX_VALUE) {
            this.value++;
        }
        else {
            this.value = INIT_VALUE;
        }
    }
}
