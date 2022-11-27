import { Quote } from '../models/quote.model';

export interface LoadedStocks {
  stockAbbr: string;
  stock: string;
  stockData: Quote;
  arrowSymbol: string;
  arrowUnicode: string;
}
