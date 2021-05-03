import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { processing, ready} from '../counter.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
})
export class MyCounterComponent {
  
  count$: Observable<number>
 
  constructor(private store: Store<{ count: number }>) {
    this.count$ = store.select('count');
  }
 
  ready() {
    this.store.dispatch(ready());
  }
 
  processing() {
    this.store.dispatch(processing());
  }
  
   
}