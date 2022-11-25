import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './views/stock/stock/stock.component';

const routes: Routes = [
  { path: '', redirectTo: '/stock', pathMatch: 'full' },
  {
    path: 'stock',
    title: 'Stocks',
    component: StockComponent,
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
