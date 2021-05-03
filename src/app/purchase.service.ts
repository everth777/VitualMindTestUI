import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient) { }

  purchase(purchase:any){   
    const url = `http://localhost:50696/api/v1/transaction`
    return this.http.post(url,purchase,{headers:{'Content-Type': 'application/json'}})
  }
 
}
