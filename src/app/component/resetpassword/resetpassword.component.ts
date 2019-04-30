import { Component, OnInit } from '@angular/core';
import { ResetModel } from 'src/app/model/reset-model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/service/http-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  password : ResetModel = new ResetModel();
  resetpasswordForm :FormGroup;
  token : string;

  constructor(private snackBar: MatSnackBar,
    private httpservice:HttpService,
    private formBuilder: FormBuilder,
    private route : ActivatedRoute,
    private router:Router) { 

  }

  ngOnInit() {
    this.resetpasswordForm = this.formBuilder.group(
      {
        'newPassword':new FormControl(this.password.newPassword,[Validators.minLength(6)]),
        'confirmPassword':new FormControl(this.password.confirmPassword,[Validators.minLength(6)])
      }
    )
    this.token = this.route.snapshot.paramMap.get('token');
  }
  onReset(){
    
    if(this.password.newPassword != this.password.confirmPassword) throw "Password and Confirm Password does not match";
    if(this.password.newPassword === '' || this.password.confirmPassword === '') throw "Empty fields";
    this.httpservice.putRequest("resetpassword/"+this.token , this.password).subscribe(
        (response:any) => {
          if(response.statusCode === 1){
            console.log(response);
            this.snackBar.open(
              "Password reset Successfully",
              "undo",
              {duration:2500}
            )
            this.router.navigate(['/login'])
          }else{
            console.log(response);
            this.snackBar.open(
              "Password reset Failed",
              "undo",
              {duration:2500}
            )
          }
        }
    )

  }

}
