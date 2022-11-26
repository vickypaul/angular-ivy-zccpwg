import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

import { Quote } from '../models/quote.model';
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
      .get<Quote>(environment.SYMBOL_ENDPOINT, {
        params: searchParams,
        responseType: 'json',
      })
      .pipe(
        map((responseData) => {
          return responseData;
        })
      );
  }
}
