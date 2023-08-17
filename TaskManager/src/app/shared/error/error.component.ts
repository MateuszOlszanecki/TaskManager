import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  counter: number = 10;

  ngOnInit() {
    setInterval(() => this.counter--, 1000);
    setInterval(() => {
      window.location.reload();
    }, this.counter * 1000);
  }
}