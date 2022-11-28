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
    this.apiService.fetchSentimentDetails(this.stockAbbr).subscribe({
      next: (sentimentDetails) => {
        if (
          sentimentDetails['data'].length &&
          sentimentDetails['data'].length < 3
        ) {
          var lastMonth =
            sentimentDetails['data'][sentimentDetails['data'].length - 1][
              'month'
            ];
          for (let i = sentimentDetails['data'].length + 1; i <= 3; i++) {
            lastMonth = lastMonth == 12 ? 1 : lastMonth + 1;
            sentimentDetails['data'][i - 1] = new Object();
            sentimentDetails['data'][i - 1]['month'] = lastMonth;
            sentimentDetails['data'][i - 1]['nodatafound'] = 1;
          }
        }
        this.isSentimentDataLoaded = true;
        this.SpinnerService.hide();
        this.sentimentData = sentimentDetails;
      },
      error: (err) => {
        this.SpinnerService.hide();
      },
      complete: () => {},
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
