import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  aim = "Your Perfect Banking Partner"  // eg. for string interpolation
  data1 = "Enter account number"
  data2 = "Enter password"
  acno = ' '
  psw = ' '


  userDetails: any = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0 },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0 },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0 },
    1003: { acno: 1003, username: "mega", password: 123, balance: 0 },
  }


  //login method
//   login() {
//     // alert('login clicked')  // just to know if this method works

//     var acno = this.acno
//     var psw = this.psw
//     var userDetails = this.userDetails
//     if (acno in userDetails) {
//       if (psw == userDetails[acno]["password"]) {
//         alert('login success')
//       }
//       else {
//         alert('password incorrect')
//       }
//     }
//     else {
//       alert('incorrect username')
//     }
//   }


//   //event binding using $event  // $event is used when method is called
//   acnoChange(event: any) {
//     // console.log(event);            here we shall check in the console section while inspect to know where the value is - it is an object form.

//     this.acno = event.target.value
//   }


//   pswChange(event: any) {
//     // console.log(event);
//     this.psw = event.target.value

//   }
// }

login(a:any,b:any) {
  this.acno=a.value
  this.psw=b.value

  var acno = this.acno
  var psw = this.psw
  var userDetails = this.userDetails
  if (acno in userDetails) {
    if (psw == userDetails[acno]["password"]) {
      alert('login success')
    }
    else {
      alert('password incorrect')
    }
  }
  else {
    alert('incorrect username')
  }
}
}