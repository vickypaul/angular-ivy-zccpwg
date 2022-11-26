import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Quote } from '../../models/quote.model';
import { Stock } from '../../models/stock.model';

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
  loadedStocks: Array<{ stock: string; stockData: Quote }> = [];
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
      this.apiService.fetchStocks(this.stockAbbr).subscribe(
        (stockData) => {
          this.loadedStocks.push({
            stock: this.stockAbbr,
            stockData: stockData,
          });
          console.log(this.loadedStocks);
        },
        (error) => {}
      );
    }
  }
}
