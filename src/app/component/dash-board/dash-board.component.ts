
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';
import { MatDialog } from '@angular/material';
import { LebelDialogboxComponent } from '../lebel-dialogbox/lebel-dialogbox.component';
import { LabelService } from 'src/app/service/label.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  token: string;
  email: string;
  
  user: LoginModel = new LoginModel();
  allLabels: any[];
  constructor(private router: Router,public dialog: MatDialog,private labelService: LabelService ) { 
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.email = localStorage.getItem('email');
    this.getLabels();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  openDialogLabel() :void {
    const dialogRef = this.dialog.open(LebelDialogboxComponent, {
      width: '300px', minHeight: '100px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getLabels() {
    console.log("Get Label");
    this.labelService.getRequest("label/getlabel").subscribe(
      (response: any) => {
        this.allLabels = response;
        console.log(this.allLabels);
      }
    );
  }
}
