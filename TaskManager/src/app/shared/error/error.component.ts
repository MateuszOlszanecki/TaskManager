import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit {
  counter_seconds: number = 5;
  auto_refresh = true;
  interval!: ReturnType<typeof setInterval>;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.counter_seconds--;
      if(this.counter_seconds === 0) {
        clearInterval(this.interval);
        window.location.reload();
      }
    }, 1000)
  }
  
  onCancel() {
    clearInterval(this.interval);
    this.auto_refresh = false;
  }
}