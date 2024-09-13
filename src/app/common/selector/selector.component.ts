import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

export interface IcurrencyData {
  meta: {last_updated_at: string},
  data: {
    [key:string]: {
      code: string,
      value: number
    }
  }
}


@Component({
  selector: 'app-selector',
  standalone: true,
  imports: [],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss'
})
export class SelectorComponent implements OnInit {
  @Input() currency!: string
  @Input() currencyData!: any
  @Output() eventCurrencyChange = new EventEmitter()

  public tempCurrency!: string


  ngOnInit(): void {
      this.tempCurrency = this.currency
  }

  loopObjects(obj:any) {
    return Object.keys(obj)
  }

  onChangeHandler(e: Event): void {
    const newValue = (e.target as HTMLOptionElement).value
    this.tempCurrency = newValue
    this.eventCurrencyChange.emit(newValue)
  }
}
