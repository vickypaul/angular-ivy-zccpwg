import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goBacktoStock() {
    this.router.navigate(['']);
  }
}
