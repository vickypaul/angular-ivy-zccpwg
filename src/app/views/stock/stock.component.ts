import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Quote } from '../../models/quote.model';
import { zip } from 'rxjs';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stockAbbr: string;
  stockAbbrArray: Array<string> = [];
  storedStockAbbr: Array<string> = [];
  quote: Quote;
  loadedStocks: Array<{
    stockAbbr: string;
    stock: string;
    stockData: Quote;
    arrowSymbolUp: string;
    arrowSymbolDwn: string;
  }> = [];
  upArrow: boolean = false;
  arrowSymbol: string;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.storedStockAbbr = JSON.parse(localStorage.getItem('employees'));
    console.log(this.storedStockAbbr);
  }

  searchStock(postData: { stockInput: string }) {
    this.stockAbbr = postData.stockInput.toUpperCase();
    if (this.stockAbbr) {
      //saving data in local storage
      this.stockAbbrArray.push(this.stockAbbr);
      localStorage.setItem('stockAbbr', JSON.stringify(this.stockAbbrArray));

      //stock fetch API call
      zip(
        this.apiService.fetchStocks(this.stockAbbr),
        this.apiService.fetchStockName(this.stockAbbr)
      ).subscribe(([stockData, stockName]) => {
        console.log(stockData);
        if (stockData.dp > 0) {
          this.upArrow = true;
          this.arrowSymbol = '&#8593;';
        } else {
          this.upArrow = false;
          this.arrowSymbol = '&#8595;';
        }

        this.loadedStocks.push({
          stockAbbr: this.stockAbbr,
          stock: stockName,
          stockData: stockData,
          arrowSymbolUp: this.arrowSymbol,
          arrowSymbolDwn: this.arrowSymbol,
        });
        console.log(this.loadedStocks);
      });
    }
  }
}
