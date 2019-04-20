import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-set-forgot-password',
  templateUrl: './set-forgot-password.component.html',
  styleUrls: ['./set-forgot-password.component.scss']
})
export class SetForgotPasswordComponent implements OnInit {
  token: string;
  newpassword : string;
  setforgotpasswordForm : FormGroup;
  constructor(private snackBar: MatSnackBar,
    private httpservice:HttpService,
    private formBuilder: FormBuilder,
    private router : ActivatedRoute) { }

  ngOnInit() {
    this.setforgotpasswordForm = this.formBuilder.group(
      {
        'newpassword':this.newpassword
      }
    )
    this.token = this.router.snapshot.paramMap.get('token');
  }
  onSubmit(){
    console.log("Set forgotted password");
    this.httpservice.putRequest("resetpassword/"+this.token,this.newpassword)
  }
}
