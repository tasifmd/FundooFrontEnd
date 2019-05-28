import { DataService } from 'src/app/service/data.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';

@Component({
  selector: 'app-lebel-dialogbox',
  templateUrl: './lebel-dialogbox.component.html',
  styleUrls: ['./lebel-dialogbox.component.scss']
})
export class LebelDialogboxComponent implements OnInit {
  label: any;
  flag: boolean;
  allLabels: any[];
  labelName = new FormControl('');
  message : any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private labelService: LabelService, private snackbar: MatSnackBar, public dialogRef: MatDialogRef<LebelDialogboxComponent>,private dataService : DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response:any)=> {
        this.message=response;
        this.getLabels();
      }
    );
  }

  addLabel() {
    this.label = {
      "labelName": this.labelName.value
    };
    console.log("Add label");
    this.labelService.postRequest("label/create", this.label).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackbar.open(response.statusMessage,"close",{duration:2500});
        } else {
          this.snackbar.open(response.statusMessage,"close",{duration:2500});
        }
      }
    );
    this.dialogRef.close();
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

  deletelabel(label) {
    console.log("Delete label");
    this.labelService.deleteRequest("label/delete?labelId=" + label.labelId).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackbar.open(response.statusMessage,"close",{duration:2500})
        } else {
          this.snackbar.open(response.statusMessage,"close",{duration:2500});
        }
      }
    );
  }

  labeledit(label) {
    this.label = {
      "labelName": this.labelName.value
    };
    this.labelService.putRequest("label/update?labelId=" + label.labelId, this.label).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackbar.open(response.statusMessage,"close",{duration:2500});
        } else {
          this.snackbar.open(response.statusMessage,"close",{duration:2500});
        }
      }
    );
  }


}
