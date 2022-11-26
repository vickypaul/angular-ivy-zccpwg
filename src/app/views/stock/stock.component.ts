import { Component, OnInit } from '@angular/core';
import { Stock } from '../../models/stock.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stockAbbr: string;
  stockAbbrArray: Array<string> = [];
  storedStockAbbr: Array<string> = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.storedStockAbbr = JSON.parse(localStorage.getItem('employees'));
    console.log(this.storedStockAbbr);
  }

  searchStock(postData: Stock) {
    this.stockAbbr = postData.stockInput.toUpperCase();
    if (this.stockAbbr) {
      this.stockAbbrArray.push(this.stockAbbr);
      localStorage.setItem(
        'stockAbbrArray',
        JSON.stringify(this.stockAbbrArray)
      );
    }
  }
}
