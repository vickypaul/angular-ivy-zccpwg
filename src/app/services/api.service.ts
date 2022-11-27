import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Quote } from '../models/quote.model';
import { SymbolLookup } from '../models/symbolLookup.model';
import { Sentiment } from '../models/sentiment.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  fetchStocks(stockAbbr: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('symbol', stockAbbr);
    searchParams = searchParams.append('token', environment.API_KEY);
    return this.http.get<Quote>(environment.QUOTE_ENDPOINT, {
      params: searchParams,
      responseType: 'json',
    });
  }

  fetchStockName(stockAbbr: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('q', stockAbbr);
    searchParams = searchParams.append('token', environment.API_KEY);
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

  fetchSentimentDetails(stockAbbr: string) {
    let startDate =
      new Date().getFullYear().toString() +
      '-' +
      ('0' + (new Date().getMonth() - 2).toString()).slice(-2) +
      '-' +
      ('0' + new Date().getDate().toString()).slice(-2);
    let endDate =
      new Date().getFullYear().toString() +
      '-' +
      ('0' + (new Date().getMonth() + 1).toString()).slice(-2) +
      '-' +
      ('0' + new Date().getDate().toString()).slice(-2);
    let searchParams = new HttpParams();
    searchParams = searchParams.append('symbol', stockAbbr);
    searchParams = searchParams.append('from', startDate);
    searchParams = searchParams.append('to', endDate);
    searchParams = searchParams.append('token', environment.API_KEY);
    return this.http.get<Sentiment>(environment.SENTIMENT_ENDPOINT, {
      params: searchParams,
      responseType: 'json',
    });
  }
}
