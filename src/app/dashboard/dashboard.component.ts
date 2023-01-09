import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent {

  // acno = ''
  // psw = ''
  // amnt = ''
  // acno1 = ''
  // psw1 = ''
  // amnt1 = ''

  user='' //to store dependancy injected data (username to be displayed in the dahsboard)

  constructor(private ds: DataService, private fb:FormBuilder) {
    
    this.user=this.ds.currentuser //access username 
   }

   depositeForm=this.fb.group({acno:['',[Validators.required, Validators.pattern('[0-9]+')]],
   psw:['',[Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
   amnt:['',[Validators.required, Validators.pattern('[0-9]+')]]})

   withdrawForm=this.fb.group({acno1:['',[Validators.required, Validators.pattern('[0-9]+')]],
   psw1:['',[Validators.required, Validators.pattern('[0-9a-zA-Z]+')]],
   amnt1:['',[Validators.required, Validators.pattern('[0-9]+')]]})

  deposit() {

    var acno = this.depositeForm.value.acno
    var psw = this.depositeForm.value.psw
    var amnt = this.depositeForm.value.amnt


    if(this.depositeForm.valid){
      const result = this.ds.deposit(acno, psw, amnt)

    if (result) {
      alert(`${amnt} has been credited to your account and the available balance is ${result}`)
    }
    else {
      alert('incorrect account number or password')
    }
  }
  else{
      alert('invalid form')
  }
  }

  
  withdraw() {
    var acno1 = this.withdrawForm.value.acno1
    var psw1 = this.withdrawForm.value.psw1
    var amnt1 = this.withdrawForm.value.amnt1

    const result = this.ds.withdraw(acno1, psw1, amnt1)

    if(this.withdrawForm.valid){
    if (result) {
      alert(`${amnt1} has been debited from your account and the available balance is ${result}`)
    }
  }
  else{
    alert('invalid form')
  }
  }
}
