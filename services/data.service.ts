import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  userDetails:any
  currentuser = '' // to save details after login function and further display in the dashboard
  currentacno = '' // for using in transaction section... storing acno

  constructor() {
    this.getdetails()
    // to get the data from localstorage - getdetails() in dataservices.ts - this method need to be called in every function .. so we will call it in the begining i.e. inside constructor (as the constructor will work first)
   }


  //creating a method to store datas to local storage -
  saveDetails() {
    if (this.userDetails) {
      localStorage.setItem("database", JSON.stringify(this.userDetails))
    }

    if (this.currentuser) {
      localStorage.setItem("currentuser", JSON.stringify(this.currentuser))
    }

    if (this.currentacno) {
      localStorage.setItem("currentacno", JSON.stringify(this.currentacno))
    }
  }

  // creating a method to get data from localStorage
  getdetails() {
    if (localStorage.getItem('database')) {
      this.userDetails = JSON.parse(localStorage.getItem('database') || '')   // json format requires - assigning an empty string.....as there is a probability that the given key can be empty in localstorage
    }

    if (localStorage.getItem('currentuser')) {
      this.currentuser = JSON.parse(localStorage.getItem('currentuser') || '')
    }

    if (localStorage.getItem('currentacno')) {
      this.currentacno = JSON.parse(localStorage.getItem('currentacno') || '')
    }
  }

  // userDetails: any = {
  //   1000: { acno: 1000, username: "anu", password: 123, balance: 0, transaction: [] },
  //   1001: { acno: 1001, username: "amal", password: 123, balance: 0, transaction: [] },
  //   1002: { acno: 1002, username: "arun", password: 123, balance: 0, transaction: [] },
  //   1003: { acno: 1003, username: "mega", password: 123, balance: 0, transaction: [] },
  // }

  register(acno: any, uname: any, psw: any) {
    var userDetails = this.userDetails
    if (acno in userDetails) {
      return false
    }
    else {
      userDetails[acno] = { acno, username: uname, password: psw, balance: 0, transaction: [] }
      console.log(userDetails);
      this.saveDetails()            //here userdetail is refered, details shall be stored in localstorage
      return true
    }
  }

  login(acno: any, psw: any) {
    var userDetails = this.userDetails

    if (acno in userDetails) {
      if (psw == userDetails[acno]["password"]) {
        this.currentuser = userDetails[acno]["username"]       //to store username
        this.currentacno = acno                                // to store acno for using in transactions file
        this.saveDetails()
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
        userDetails[acno]['transaction'].push({ type: 'CREDIT', amount: amnt })
        this.saveDetails()
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

          userDetails[acno]['transaction'].push({ type: 'DEBIT', amount: amnt })
          this.saveDetails()

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


  gettransactions(acno: any) {
    return this.userDetails[acno]["transaction"]
  }

}
