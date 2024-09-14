import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Icurrency {
  meta: {last_updated_at: string},
  data: {
    [key:string]: {
      code:string,
      value:number,
    }
  }
} 

@Injectable({
  providedIn: 'root'
})
export class CurrencyApiService {

  constructor(private _httpClient: HttpClient) {}

  getCurrency (): Observable<Icurrency> {
    return this._httpClient.get<Icurrency>('https://api.currencyapi.com/v3/latest?apikey=cur_live_tgXlsivDtObRkdR1fz4K3c9KmJNiRUfpm0uDhzlE')
  }
}
