import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
})
export class StockComponent implements OnInit {
  stockAbbr: string;
  constructor() {}

  ngOnInit() {}

  trackStock(postData) {
    this.stockAbbr = postData.stockInput.toUpperCase();
    console.log(this.stockAbbr);
  }
}
