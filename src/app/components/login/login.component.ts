import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { User } from 'src/app/models/user';
import { FormGroup, NgForm, FormControl, Validator, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
 // styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public title: string;
  public desc: string;
  public user: User;
  public pw: string;
  public mail: string;
  public status: any;
  logStatus:any;

  constructor(private router: Router,
              public authS:AuthService
  ){
  
    this.title = 'Login From';
    this.desc = 'Angular Demo';
    this.pw = "123456";
    this.mail = "user@demo.com";
    this.user = new User(0,'','');
  }
  
  myForm = new FormGroup({
    email: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),

  });

  ngOnInit(){
    this.authS.isLoggedIn.subscribe((status) => {
      this.logStatus = status;
    });
    
  }
 
  login(){
    if (this.myForm.invalid) { console.log('ento aca');
        this.status = 'error'; 
        return;
    } else { console.log('ento aca 2');
        if (this.mail == this.myForm.value.email && this.pw== this.myForm.value.password) {
         localStorage.setItem('identity', this.mail);
          this.authS.loginUser();
          this.router.navigate(['/products']);
        } else {
          this.status = 'error'; 
          return;
        }
    }
   
  }



}
