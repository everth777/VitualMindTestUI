import { NgModule } from '@angular/core';
import {  QuoteComponent } from './quote/quote.component';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseComponent } from './purchase/purchase.component';


const routes: Routes = [
  { path: 'quote', component: QuoteComponent },
  { path: 'purchase', component: PurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [QuoteComponent, PurchaseComponent]