import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user-model';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,private httpservice:HttpService) { }

  ngOnInit() {
  }

  user: UserModel = new UserModel();
  
  onRegister(){
    console.log("Registration");
    const user = {
      name:this.user.name,
      email:this.user.email,
      password:this.user.password,
      mobileNumber:this.user.mobileNumber
    }
    console.log(user);
    this.httpservice.postRequest("register",user).subscribe(
      (response:any) => {
        this.snackBar.open(
          response.statusMessage,
          "undo",
          {duration:2500}
        )
        console.log(response);
      }
      
    )
  }
}
