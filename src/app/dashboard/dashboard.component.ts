import { Component } from '@angular/core';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  acno = ''
  psw = ''
  amnt = ''
  acno1 = ''
  psw1 = ''
  amnt1 = ''

  constructor(private ds: DataService) { }

  deposit() {

    var acno = this.acno
    var psw = this.psw
    var amnt = this.amnt

    const result = this.ds.deposit(acno, psw, amnt)

    if (result) {
      alert(`${amnt} has been credited to your account and the available balance is ${result}`)
    }
    else {
      alert('incorrect account number or password')
    }
  }

  withdraw() {
    var acno1 = this.acno1
    var psw1 = this.psw1
    var amnt1 = this.amnt1

    const result = this.ds.withdraw(acno1, psw1, amnt1)

    if (result) {
      alert(`${amnt1} has been debited from your account and the available balance is ${result}`)
    }
  }
}
