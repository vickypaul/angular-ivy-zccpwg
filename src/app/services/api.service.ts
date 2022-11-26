import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Quote } from '../models/quote.model';
import { SymbolLookup } from '../models/symbol-lookup.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {}

  fetchStocks(stockAbbr) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('symbol', stockAbbr);
    searchParams = searchParams.append('token', environment.API_KEY);
    console.log(searchParams);
    return this.http
      .get<Quote>(environment.QUOTE_ENDPOINT, {
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }

  fetchStockName(stockAbbr) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('q', stockAbbr);
    searchParams = searchParams.append('token', environment.API_KEY);
    console.log(searchParams);
    return this.http
      .get<SymbolLookup>(environment.SYMBOL_ENDPOINT, {
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          return responseData.result[0].description;
        })
      );
  }
}
