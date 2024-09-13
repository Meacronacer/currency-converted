import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './common/input/input.component';
import { SelectorComponent } from "./common/selector/selector.component";
import { currencyData } from './data';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, SelectorComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CurrencyPipe]
})
export class AppComponent {
  title = 'project';
  public data = currencyData.data
  public amount:number | string = 1.00
  public convertTo:number | string = Number(this.data.UAH.value).toFixed(2)
  public from:string = 'USD'
  public to:string = 'UAH'

  constructor(private currencyPipe: CurrencyPipe) {}


  onSwitchCurrency(from:string, to:string, amount:string | number, convertTo:string | number) {
    this.from = to
    this.to = from
    this.amount = convertTo
    this.convertTo = amount
  }

  onHandlerChangeAmountFrom(value:number) {
    this.amount = value
    // @ts-ignore
    this.convertTo = this.currencyPipe.transform((
      // @ts-ignore
      (this.data[this.to].value / this.data[this.from].value) * value
    ).toFixed(2))?.replace('$', '')
  }

  onHandlerChangeAmountTo(value:number) {
    this.convertTo = value
    // @ts-ignore
    this.amount = this.currencyPipe.transform((
      // @ts-ignore
      (this.data[this.from].value / this.data[this.to].value) * value
    ).toFixed(2))?.replace('$', '')
  }

  onHandlerChangeCurrencyFrom(value:string) {
    this.from = value
    this.onHandlerChangeAmountFrom(Number(this.amount))
  }

  onHandlerChangeCurrencyTo(value:string) {
    this.to = value
    this.onHandlerChangeAmountTo(Number(this.convertTo))
  }
}
