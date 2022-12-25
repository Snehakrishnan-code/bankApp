import { Component } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent {
acno:any
transaction:any

  constructor(private ds:DataService){
    this.acno=this.ds.currentacno
   this.transaction= this.ds.gettransactions(this.acno)
   console.log(this.transaction);



   //for (i of transaction) in html to display these data
  }
}
