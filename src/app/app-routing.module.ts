import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './views/stock/stock.component';

const routes: Routes = [
  {
    path: '',
    title: 'Stocks',
    component: StockComponent,
    pathMatch: 'full',
  },
  //{ path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
