import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  aim = "Your Perfect Banking Partner"  // eg. for string interpolation
  data1 = "Enter account number"
  data2 = "Enter password"
  // acno = ''
  // psw = ''

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }


  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    psw: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]+')]]
  })

  userDetails: any = {
    1000: { acno: 1000, username: "anu", password: 123, balance: 0 },
    1001: { acno: 1001, username: "amal", password: 123, balance: 0 },
    1002: { acno: 1002, username: "arun", password: 123, balance: 0 },
    1003: { acno: 1003, username: "mega", password: 123, balance: 0 },
  }


  login() {
    // alert('login clicked')  // just to know if this method works

    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw


    if(this.loginForm.valid){
          const result = this.ds.login(acno, psw)

    if (result) {
      alert('login successful')
      this.router.navigateByUrl('dashboard')
    }
    else {
      alert('incorrect username or password')
    }

  }

  else{
    alert("invalid form")
  }
}
}
