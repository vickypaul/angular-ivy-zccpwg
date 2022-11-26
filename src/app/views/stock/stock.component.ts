import { Component, OnInit } from '@angular/core';
import { stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stockAbbr: string;
  stockAbbrArray: Array<string> = [];
  storedStockAbbr: Array<string> = [];
  constructor() {}

  ngOnInit() {
    this.storedStockAbbr = JSON.parse(localStorage.getItem('employees'));
    console.log(this.storedStockAbbr);
  }

  searchStock(postData: stock) {
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
