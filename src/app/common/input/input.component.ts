import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() label!:string
  @Input() amount!: number | string
  @Output() eventAmountChange = new EventEmitter()

  public tempAmount!: number | string

  constructor(private currencyPipe: CurrencyPipe) {
    this.tempAmount = this.amount
  }

  onChangeValueHandler(e: any) {
    const newValue = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '');
    e.target.value = newValue
    this.tempAmount = newValue
    this.eventAmountChange.emit(Number(newValue))
  }

  transformAmount(e: any) {
    if (e.target.value) {
      e.target.value = this.currencyPipe.transform(e.target.value, '', 'symbol')?.replace('$', '')
    } else {
      e.target.value = 0.00
    }
  }

}
