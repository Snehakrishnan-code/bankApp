import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  currentuser='' // to save details after login function and further display in the dashboard
  currentacno='' // for using in transaction section... storing acno

  constructor() { }

  userDetails: any = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction:[]},
    1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction:[]},
    1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction:[]},
    1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction:[]},
  }

  register(acno: any, uname: any, psw: any) {
    var userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction:[]}
      console.log(userDetails);

      return true
    }
  }

  login(acno: any, psw: any) {
    var userDetails = this.userDetails
    
    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        this.currentuser=userDetails[acno]["username"]       //to store username
        this.currentacno=acno                                // to store acno for using in transactions file
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }


  deposit(acno: any, password: any, amount: any) {
    var userDetails = this.userDetails
    var amnt = parseInt(amount)    // amount is string value, it will be changed to integer value
    if (acno in userDetails) {     // check acno number in database
      if (password == userDetails[acno]["password"]) {  // check password
        userDetails[acno]["balance"] += amnt            // add deposited amount into the balance
        userDetails[acno]['transaction'].push({type:'CREDIT',amount:amnt})
        return userDetails[acno]["balance"]             // to get this output when function called
      }
      else {
        return false
      }

    }
    else {
      return false
    }
  }



  withdraw(acno: any, password: any, amount: any) {
    var userDetails = this.userDetails
    var amnt = parseInt(amount)    // amount is string value, it will be changed to integer value
    if (acno in userDetails) {     // check acno number in database
      if (password == userDetails[acno]["password"]) {
        if (amnt <= userDetails[acno]["balance"]) {
          userDetails[acno]["balance"] = userDetails[acno]["balance"] - amnt

          userDetails[acno]['transaction'].push({type:'DEBIT',amount:amnt})

          return userDetails[acno]["balance"]
        }
        else {
          alert('insufficient balance')
          return false
        }
      }
      else {
        alert('incorrect password')
        return false
      }
    }
    else {
      alert('incorrect account number')
      return false
    }
  }


  gettransactions(acno:any){
    return this.userDetails[acno]["transaction"]
  }

}
