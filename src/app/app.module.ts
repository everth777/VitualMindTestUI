import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';

import { StoreModule }  from '@ngrx/store'
import { counterReducer } from './counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';


@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({ count: counterReducer }),
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }