import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  constructor(private http: HttpClient) { }

  getExchangeRate(currncy:string){
    const url = `http://localhost:50696/api/v1/exchangerate/${currncy}`
    return this.http.get(url)
  }
}
