import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//global overloading headers   - done outside the ds
const option = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
    // this.getdetails()
    // to get the data from localstorage - getdetails() in dataservices.ts - this method need to be called in every function .. so we will call it in the begining i.e. inside constructor (as the constructor will work first)
  }



  //token to be given in header section
  gettoken() {
    const token = JSON.parse(localStorage.getItem('token') || '')               //token receiven from local storage

    let headers = new HttpHeaders()                                             // header object created to pass token into

    if (token) {
      option.headers = headers.append('access-token', token)                               //http request accepts only overloaded tokens
    }
    return option

  }

  register(acno: any, uname: any, psw: any) {
    const data = {
      acno, uname, psw
    }
    return this.http.post('http://localhost:3000/register', data)          //from front end to 3000 port.. so it is asynchronous
  }

  login(acno: any, psw: any) {
    const data = {
      acno, psw
    }
    return this.http.post('http://localhost:3000/login', data)          //from front end to 3000 port.. so it is asynchronous

  }



  //appen token in required function
  deposit(acno: any, password: any, amount: any) {
    const data = {
      acno, psw: password, amount                                          //key (as in thunderclient body): value (given by client in the front end)
    }
    return this.http.post('http://localhost:3000/deposit', data, this.gettoken())          //from front end to 3000 port.. so it is asynchronous

  }



  withdraw(acno: any, password: any, amount: any) {
    const data = {
      acno, psw: password, amount                                          //key (as in thunderclient body): value (given by client in the front end)
    }
    return this.http.post('http://localhost:3000/withdraw', data, this.gettoken())          //from front end to 3000 port.. so it is asynchronous
  }


  gettransactions(acno: any) {
    const data = {
      acno                                       //key (as in thunderclient body): value (given by client in the front end)
    }
    return this.http.post('http://localhost:3000/gettransactions', data, this.gettoken())          //from front end to 3000 port.. so it is asynchronous
   }


   deleteacc(acno:any){
    return this.http.delete('http://localhost:3000/deleteacc/'+acno, this.gettoken())          //string concatination of acno
   }
}
