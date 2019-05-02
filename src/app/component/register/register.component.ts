import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  user: UserModel = new UserModel();
  registerForm: FormGroup;
  
  constructor(private snackBar: MatSnackBar,private httpservice:HttpService,private formBuilder: FormBuilder,private router : Router) { }
 
  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        'name':new FormControl(this.user.name,[Validators.required]),
        'email':new FormControl(this.user.email,Validators.required),
        'password':new FormControl(this.user.password,[Validators.required,Validators.minLength(6)]),
        'mobileNumber':new FormControl(this.user.mobileNumber,[Validators.required])
      }
    )

  }

  onRegister(){
    console.log("Registration");
    this.httpservice.postRequest("register",this.user).subscribe(
      (response:any) => {
        if(response.statusCode === 1){
          console.log(response);
          this.snackBar.open(
            "Registered Successfully",
            "undo",
            {duration:2500}
          );
          this.router.navigate(['/login']);
        }else{
          console.log(response);
          this.snackBar.open(
            "Registration Failed",
            "undo",
            {duration:2500}
          )
        }

      }
    )
  }
}
