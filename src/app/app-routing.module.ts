import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SentimentComponent } from './views/sentiment/sentiment.component';
import { StockComponent } from './views/stock/stock.component';

const routes: Routes = [
  {
    path: '',
    title: 'Stocks',
    component: StockComponent,
    pathMatch: 'full',
  },
  {
    path: 'sentiment/:symbol',
    component: SentimentComponent,
    pathMatch: 'full',
  },
  { path: '**', component: StockComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
