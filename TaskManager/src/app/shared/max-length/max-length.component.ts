import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-max-length',
  templateUrl: './max-length.component.html'
})
export class MaxLengthComponent {
  @Input() length = 0;
  @Input() maxLength = 0;
}
