import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/model/login-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user:LoginModel = new LoginModel();
  loginForm : FormGroup;
  constructor(private snackBar: MatSnackBar,
    private httpservice:HttpService,
    public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'email':new FormControl(this.user.email,[Validators.required]),
        'password':new FormControl(this.user.password,[Validators.required,Validators.minLength(6)])
      }
    )
  }

  onLogin(){
    console.log("Login");
    console.log(this.user.email)
    this.httpservice.postRequest("login",this.user).subscribe(
      (response:any) => {
        if(response.statusCode === 1){
          console.log(response);
          localStorage.setItem('token',response.token);
          this.snackBar.open(
            "Login Successfully",
            "undo",
            {duration:2500}
          )
        }else{
          console.log(response);
          this.snackBar.open(
            "Login Failed",
            "undo",
            {duration:2500}
          )
        }
      }
    )
  }

}
