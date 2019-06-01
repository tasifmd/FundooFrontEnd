import { GoogleLoginProvider } from 'angularx-social-login';
import { FacebookLoginProvider } from 'angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/model/login-model';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: LoginModel = new LoginModel();
  loginForm: FormGroup;
  token: string;
  userInfo: any;
  socialLogin :boolean;
  constructor(private snackBar: MatSnackBar,
    private httpservice: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        'email': new FormControl(this.user.email, [Validators.required]),
        'password': new FormControl(this.user.password, [Validators.required, Validators.minLength(6)])
      }
    )
   
  }

  onLogin() {
    console.log("Login");
    console.log(this.user.email);
    this.token = localStorage.getItem('token');
    this.httpservice.postRequest("login", this.user).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          console.log(response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', this.user.email);
          localStorage.setItem('userName' , response.userName);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 })
          this.router.navigate(['/dashboard']);
          
        } else {
          console.log(response);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 })
        }
      }
    )
  }


  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    
    this.authService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        if(userData != null){
          console.log("Social login scccessfull");
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token',userData.authToken);
          localStorage.setItem('email',userData.email);
          localStorage.setItem('userName' , userData.name);
          localStorage.setItem('photoUrl',userData.photoUrl);
          this.socialLogin = true;
        }  
      }
    );
  }
}
