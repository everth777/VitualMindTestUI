import { Component, OnInit } from '@angular/core';
import { processing, ready } from '../counter.actions';
import { PurchaseService } from '../purchase.service'
import { QuoteService } from '../quote.service';


declare const $: any

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

  constructor(private purchaseService: PurchaseService, private quoteService: QuoteService) { }

  ngOnInit(): void {
    this.jquery_code();
    this.getExchangeRate();
  }
  jquery_code() {
    $(document).ready(function () {
      $('select').formSelect();
    });
  }

  async getExchangeRate(){
    const exchangeRateUSD:any = await this.quoteService.getExchangeRate("USD").toPromise().then(data=>data)
    const exchangeRateBRL:any = await this.quoteService.getExchangeRate("BRL").toPromise().then(data=>data)
    const tr = `<tr>
                  <td>USD</td>
                    <td>${parseFloat(exchangeRateUSD.data.buying).toFixed(2)}</td>
                    <td>${parseFloat(exchangeRateUSD.data.selling).toFixed(2)}</td>
                    <td>${exchangeRateUSD.data.date}</td>
                  <tr>
                  <td>BRL</td>
                    <td>${parseFloat(exchangeRateBRL.data.buying).toFixed(2)}</td>
                    <td>${parseFloat(exchangeRateBRL.data.selling).toFixed(2)}</td>
                    <td>${exchangeRateBRL.data.date}</td>
                  <tr>
                  `      
    document.getElementsByTagName("tBody")[0].innerHTML = tr
  }



  async purchase() {

    const userId = (<HTMLInputElement>document.getElementById("userId"))
    const currency = (<HTMLSelectElement>document.getElementById("currency"))
    const amount = (<HTMLInputElement>document.getElementById("amount"))

    if (parseInt(userId.value.trim()) < 1 || isNaN(parseInt(userId.value.trim())) || currency.value.length !== 3 || parseFloat(amount.value.trim()) <= 0 || isNaN(parseFloat(amount.value.trim()) )){
      alert("All fields are required")
      return 
    }      

    const purchase = {
      UserId: parseInt(userId.value.trim()),
      Currency: currency.value,
      Amount: parseFloat(amount.value.trim())
    }

    processing()
    try {

      document.getElementById("loader")?.setAttribute("style", "display:block")
      const result: any = await this.purchaseService.purchase(JSON.stringify(purchase)).toPromise().then(data => data);
     
      const response:any = result.message.split("|")
  
      //Making sure there is now warning or error message
      if(response[0].toString().toUpperCase() !== "SUCCESS"){
        document.getElementById("loader")?.setAttribute("style", "display:none")
        alert(response[1])      
        return
      }
  
      alert(`${response[1]}\nYou have bought ${currency.value}${parseFloat(result.data).toFixed(2)}`)
  
      userId.value = ""
      amount.value = ""
      userId.focus()
  
      document.getElementById("loader")?.setAttribute("style", "display:none")
  
      ready()
    }
    catch(error){
      ready();
      document.getElementById("loader")?.setAttribute("style", "display:none")      
      const errorResponse = `Status: ${error.status}\nResponse: ${error.statusText}`
      alert(errorResponse);
      
    }
    
  }

}