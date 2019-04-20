import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: UserModel = new UserModel();
  registerForm: FormGroup;
  constructor(private snackBar: MatSnackBar,private httpservice:HttpService,public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        'name':this.user.name,
        'email':this.user.email,
        'password':this.user.password,
        'mobileNumber':this.user.mobileNumber
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
          )
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
