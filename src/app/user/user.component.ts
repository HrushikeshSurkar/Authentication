import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],


})



export class UserComponent implements OnInit {

  savebtnclick = 'true'
  closeResult = '';
  signupList: any = [];
  signup: FormGroup;

  index = ''
  offcanvas: any;
  constructor(private formbuilder: FormBuilder, private offcanvasService: NgbOffcanvas) {
    this.signup = this.formbuilder.group({

      firstName: [''],
      lastName: [''],
      userName: [''],
      password: [''],
    })
  }
  ngOnInit(): void {
    let data = localStorage.getItem('signupList');
    this.signupList = JSON.parse(data || '');
  }

  edit(i: any) {
    this.signup.patchValue({
      firstName: this.signupList[i].firstName,
      lastName: this.signupList[i].lastName,
      userName: this.signupList[i].userName,
      password: this.signupList[i].password,
    })
    this.index = i;
    this.savebtnclick = "false";

  }

  update() {
    this.signupList[this.index].firstName = this.signup.value.firstName;
    this.signupList[this.index].lastName = this.signup.value.lastName;
    this.signupList[this.index].userName = this.signup.value.userName;
    this.signupList[this.index].password = this.signup.value.password;
    localStorage.setItem('signupList', JSON.stringify(this.signupList));
    this.clear()
  }
  clear() {
    this.signup.reset()
  }

  save() {
    console.log(this.signupList)
    this.signupList.push(this.signup.value)
    localStorage.setItem('signupList', JSON.stringify(this.signupList));

  }



  delete(i: any) {
    this.signupList.splice(i, 1)
    localStorage.setItem('signupList', JSON.stringify(this.signupList))
  }


  // ============ modal code =======
  open(content: any) {
    this.savebtnclick = "true";
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
    this.clear()
  }

  private getDismissReason(reason: any): string {
    if (reason === OffcanvasDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === OffcanvasDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on the backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
