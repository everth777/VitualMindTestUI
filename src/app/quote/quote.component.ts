import { Component, OnInit } from '@angular/core';
import {QuoteService} from '../quote.service'
import { processing, ready } from '../counter.actions';



@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {
  

  constructor(private quoteService: QuoteService) {    
    
   }

  ngOnInit(): void {
  }

  async quoteBRL(){
    processing()
    document.getElementById("loader")?.setAttribute("style","display:block")
    this.quoteService.getExchangeRate('BRL').subscribe(async data => {
      const result:any = await data;      
      const tr = `<tr>
      <td>USD</td>
        <td>${result.data.buying}</td>
        <td>${result.data.selling}</td>
        <td>${result.data.date}</td>
      <tr>`      
      document.getElementsByTagName("tBody")[0].innerHTML = tr

      document.getElementById("loader")?.setAttribute("style","display:none")
      ready()
    })
    

  }
  async quoteUSD(){
    processing()    
    document.getElementById("loader")?.setAttribute("style","display:block")
    this.quoteService.getExchangeRate('USD').subscribe(async data => {
      const result:any = await data;      
      const tr = `<tr>
      <td>USD</td>
        <td>${result.data.buying}</td>
        <td>${result.data.selling}</td>
        <td>${result.data.date}</td>
      <tr>`      
      document.getElementsByTagName("tBody")[0].innerHTML = tr

      document.getElementById("loader")?.setAttribute("style","display:none")
      
      ready()
    })
    
    
  }

}
 