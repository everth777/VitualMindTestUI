import { Action, createReducer, on } from '@ngrx/store';
import { processing, ready } from './counter.actions';
 
export const initialState = 0;
 
const _counterReducer = createReducer(
  initialState,
  on(processing, (state) => 1),
  on(ready, (state) => 0)  
);
 
export function counterReducer(state: number | undefined, action: Action) {
  return _counterReducer(state, action);
}