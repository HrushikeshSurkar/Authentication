import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  constructor(private router: Router, private formbuilder: FormBuilder) {
    this.login = this.formbuilder.group({
      userName: ['', Validators.required],
      password: ['', [Validators.required,]]
    })
  }

  ngOnInit(): void {
    let data = localStorage.getItem('signupList');
    this.signupList = JSON.parse(data || '');

  }

  signupList: any = []
  loginbtn() {


    console.log(this.login.value.userName);

    //  for loop for iterating login list and compare it with following 
    for (let i = 0; i < this.signupList.length; i++) {
      if (this.signupList[i].userName == this.login.value.userName && this.signupList[i].password == this.login.value.password) {
        this.router.navigate(['home'])
      }
      else if (this.signupList[i].userName != this.login.value.userName || this.signupList[i].password != this.login.value.password) {
        continue
      }
      else if (this.signupList.length) {
        alert('Invalid Credential')
      }


      else {
        continue
      }

    }
  }

}
