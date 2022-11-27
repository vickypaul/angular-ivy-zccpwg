import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Quote } from '../../models/quote.model';
import { LoadedStocks } from '../../models/loadedStocks.model';
import { zip } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

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
  loadedStocks: Array<LoadedStocks> = [];
  cacheStockData: Array<LoadedStocks> = [];
  arrowSymbolPosition: string;
  arrowUnicodeSymbol: string;
  constructor(
    private apiService: ApiService,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.storedStockAbbr = JSON.parse(localStorage.getItem('stockAbbr'));
    if (this.storedStockAbbr) {
      this.stockAbbrArray = this.storedStockAbbr;
    }
    this.cacheStockData = JSON.parse(localStorage.getItem('cacheStockData'));
    if (this.cacheStockData) {
      this.loadedStocks = this.cacheStockData;
    }
    console.log(this.cacheStockData);
  }

  searchStock(postData: NgForm) {
    this.stockAbbr = postData.controls.stockInput.value.toUpperCase();
    console.log(this.stockAbbr);
    if (this.stockAbbr) {
      this.SpinnerService.show();
      //saving data in local storage
      this.stockAbbrArray.push(this.stockAbbr);
      localStorage.setItem('stockAbbr', JSON.stringify(this.stockAbbrArray));

      //stock fetch API call
      zip(
        this.apiService.fetchStocks(this.stockAbbr),
        this.apiService.fetchStockName(this.stockAbbr)
      ).subscribe(
        ([stockData, stockName]) => {
          console.log(stockData);
          if (stockData.dp > 0) {
            this.arrowSymbolPosition = 'up';
            this.arrowUnicodeSymbol = '&#8593;';
          } else {
            this.arrowSymbolPosition = 'down';
            this.arrowUnicodeSymbol = '&#8595;';
          }
          this.loadedStocks.push({
            stockAbbr: this.stockAbbr,
            stock: stockName + ' (' + this.stockAbbr + ') ',
            stockData: stockData,
            arrowSymbol: this.arrowSymbolPosition,
            arrowUnicode: this.arrowUnicodeSymbol,
          });
          localStorage.setItem(
            'cacheStockData',
            JSON.stringify(this.loadedStocks)
          );
          postData.reset();
          this.SpinnerService.hide();
          console.log(this.loadedStocks);
        },
        (error) => {
          postData.reset();
          this.SpinnerService.hide();
          console.log(error);
        }
      );
    }
  }

  removeStock(event: Event): void {
    let elementId: string = (event.target as Element).id;
    let separator = 'remove';
    let lastPart = elementId.split(separator).pop();
    console.log(lastPart);
    this.cacheStockData = JSON.parse(localStorage.getItem('cacheStockData'));
    console.log(this.cacheStockData);
    this.cacheStockData.map((value, key) => {
      if (value.stockAbbr === lastPart) this.cacheStockData.splice(key, 1);
      this.loadedStocks = this.cacheStockData;
      localStorage.setItem('cacheStockData', JSON.stringify(this.loadedStocks));
    });

    this.storedStockAbbr = JSON.parse(localStorage.getItem('stockAbbr'));
    this.storedStockAbbr.map((value, key) => {
      if (value == lastPart) {
        this.storedStockAbbr.splice(key, 1);
        return;
      }
    });
    console.log(this.storedStockAbbr);
    this.stockAbbrArray = this.storedStockAbbr;
    localStorage.setItem('stockAbbr', JSON.stringify(this.storedStockAbbr));
  }

  seStockName(stockName) {
    localStorage.setItem('stockName', stockName);
  }
}
