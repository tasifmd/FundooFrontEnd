import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  email : string;
  forgotpasswordForm : FormGroup;
  constructor(private snackBar: MatSnackBar,
    private httpservice:HttpService,
    public formBuilder: FormBuilder) { 
  }

  ngOnInit() {
    this.forgotpasswordForm = this.formBuilder.group(
      {
        'email':this.email
      }
    )
  }

  onSubmit(){
    console.log("Forgot Password");
    console.log(this.email);
    this.httpservice.postRequest("forgotpassword",this.email).subscribe(
      (response:any) => {
        if(response.statusCode === 1){
          console.log(response);
          this.snackBar.open(
            "Link sent Successfully",
            "undo",
            {duration:2500}
          )
        }else{
          console.log(response);
          this.snackBar.open(
            "Password Setting Failed",
            "undo",
            {duration:2500}
          )
          }
      }
    )
  }

}
