import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [CurrencyPipe]
})
export class InputComponent {
  @Input() label:string = ''
  @Input() value = 1000

}
