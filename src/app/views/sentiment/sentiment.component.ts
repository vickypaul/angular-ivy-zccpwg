import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  stockAbbr: string;
  sentimentData: object;
  isSentimentDataLoaded: boolean = false;
  stockName: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private SpinnerService: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.SpinnerService.show();
    this.stockName = localStorage.getItem('stockName');
    this.stockAbbr = this._activatedRoute.snapshot.params.symbol;
    this.getSentimentDetails();
  }

  getSentimentDetails() {
    this.apiService
      .fetchSentimentDetails(this.stockAbbr)
      .subscribe((details) => {
        this.isSentimentDataLoaded = true;
        this.SpinnerService.hide();
        this.sentimentData = details;
      });
  }

  getMonth(monthNumber: number) {
    var monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[monthNumber - 1];
  }

  goBacktoStock() {
    this.router.navigate(['']);
  }
}
