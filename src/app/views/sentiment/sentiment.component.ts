import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  stockAbbr: string;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.stockAbbr = this._activatedRoute.snapshot.params.symbol;
    console.log(this.stockAbbr);
    this.getSentimentDetails();
  }

  getSentimentDetails() {
    this.apiService
      .fetchSentimentDetails(this.stockAbbr)
      .subscribe((details) => {
        console.log(details);
      });
  }

  goBacktoStock() {
    this.router.navigate(['']);
  }
}
