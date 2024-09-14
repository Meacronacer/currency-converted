import { Component, Input, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InputComponent } from './common/input/input.component';
import { SelectorComponent } from "./common/selector/selector.component";
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { CurrencyApiService, Icurrency } from './services/currency-api.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InputComponent, SelectorComponent, CurrencyPipe, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [CurrencyPipe, CurrencyApiService, AsyncPipe]
})
export class AppComponent implements OnInit {
  public data$!: Icurrency;
  public amount:number | string = '1.00'
  public convertTo:number | string = '1.00'
  public from:string = 'USD'
  public to:string = 'UAH'

  public usdToUah!: string | number
  public eurToUah!: string | number

  constructor(private currencyPipe: CurrencyPipe, private currencyApiService: CurrencyApiService) {}

  ngOnInit(): void {
    this.currencyApiService.getCurrency().subscribe(res => {
      this.data$ = res
      this.convertTo = Number(res.data['UAH'].value).toFixed(2)
      this.usdToUah = (res.data['UAH'].value / res.data['USD'].value * 1).toFixed(2)
      this.eurToUah = (res.data['UAH'].value / res.data['EUR'].value * 1).toFixed(2)
    })
  }

  onSwitchCurrency(from:string, to:string, amount:string | number, convertTo:string | number) {
    this.from = to
    this.to = from
    this.amount = String(convertTo)
    this.convertTo = String(amount)
  }

  onHandlerChangeAmountFrom(value:number | string) {
    this.amount = value
    this.convertTo = String(this.currencyPipe.transform(
      (this.data$.data[this.to].value / this.data$.data[this.from].value) * Number(value),
      '',
      ''
    ))
  }

  onHandlerChangeAmountTo(value:number | string) {
    this.convertTo = value
    this.amount = String(this.currencyPipe.transform(
      (this.data$.data[this.from].value / this.data$.data[this.to].value) * Number(value),
      '',
      '',
    ))
  }

  onHandlerChangeCurrencyFrom(value:string) {
    this.from = value
    this.onHandlerChangeAmountFrom(String(this.amount).replace(/[^0-9.]/g, ''))
  }

  onHandlerChangeCurrencyTo(value:string) {
    this.to = value
    this.onHandlerChangeAmountTo(String(this.convertTo).replace(/[^0-9.]/g, ''))
  }
}
