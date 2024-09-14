import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
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
  @Output() eventAmountChange = new EventEmitter<number | string>()

  public tempAmount!: number | string

  constructor(private currencyPipe: CurrencyPipe) {
    this.tempAmount = this.amount
  }

  onChangeValueHandler(e: Event): void {
    const newValue = (e.target as HTMLInputElement).value.replace(/[^0-9.]/g, '');
    (e.target as HTMLInputElement).value = newValue
    this.tempAmount = newValue
    this.eventAmountChange.emit(this.tempAmount)
  }

  transformAmount(e: Event): void {
    const newValue = (e.target as HTMLInputElement).value
    if (newValue) {
     (e.target as HTMLInputElement).value = String(this.currencyPipe.transform(
      newValue.replace(',', ''), '', ''
     ))
    } else {
     (e.target as HTMLInputElement).value = '0.00'
    }

  }

}
