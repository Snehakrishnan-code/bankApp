import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

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


  login() {
    // alert('login clicked')  // just to know if this method works

    var acno = this.loginForm.value.acno
    var psw = this.loginForm.value.psw


    if (this.loginForm.valid) {
     this.ds.login(acno, psw).subscribe((result: any) => {
        localStorage.setItem('currentacno',JSON.stringify(result.currentacno))
        localStorage.setItem('currentuser',JSON.stringify(result.currentuser))
        localStorage.setItem('token',JSON.stringify(result.token))
        alert(result.message)
        this.router.navigateByUrl('dashboard')
      },
        result => {
          alert(result.error.message)
        })
      }

  else {
        alert("invalid form")
      }
  }
}