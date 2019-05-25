import { DataService } from 'src/app/service/data.service';

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/model/login-model';
import { MatDialog, MatSnackBar } from '@angular/material';
import { LebelDialogboxComponent } from '../lebel-dialogbox/lebel-dialogbox.component';
import { LabelService } from 'src/app/service/label.service';
import { ProfileDialogComponent } from '../profile-dialog/profile-dialog.component';
import { HttpService } from 'src/app/service/http-service';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.scss']
})
export class DashBoardComponent implements OnInit {
  token: string;
  email: string;
  name: string;
  user: LoginModel = new LoginModel();
  allLabels: any[];
  message : any;
  constructor(private router: Router, public dialog: MatDialog, private labelService: LabelService, private httpService: HttpService, private snackBar: MatSnackBar, private dataService: DataService) {
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.email = localStorage.getItem('email');
    this.name = localStorage.getItem('userName');

    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getLabels();
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }
  openDialogLabel(): void {
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

  profileDialog() {
    const dialogRef = this.dialog.open(ProfileDialogComponent, {
      width: '70%', height: '85%',

    });

    dialogRef.afterClosed().subscribe(image => {
      console.log('image' + image.file);
      if (image != null) {
        this.httpService.uploadImage("uploadprofilepic", image.file).subscribe(
          (response: any) => {
            if (response.statusCode === 1) {
              this.dataService.changeMessage(response.statusMessage);
              this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
            } else {
              this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
            }
          }
        );
      }
    });
  }
}
