import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  uname=''
  acno=''
  psw=''
  d1 = "Enter Username"
  d2='Enter Account number'
  d3 = "Enter password"

  constructor(private ds:DataService, private router:Router){  }

  register(){
    var uname=this.uname
    var acno=this.acno
    var psw=this.psw

    const result=this.ds.register(acno,uname,psw)

  if(result){
    alert('registration successfull')
    this.router.navigateByUrl('')
  }
  else{
    alert('user already exist')
    this.router.navigateByUrl('')
  }
  }
}
