import { FormControl } from '@angular/forms';
import { LabelService } from './../../service/label.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-lebel-dialogbox',
  templateUrl: './lebel-dialogbox.component.html',
  styleUrls: ['./lebel-dialogbox.component.scss']
})
export class LebelDialogboxComponent implements OnInit {
  label: any;
  flag : boolean;
  allLabels: any[];
  labelName = new FormControl('');
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private labelService: LabelService, private snackbar: MatSnackBar,public dialogRef: MatDialogRef<LebelDialogboxComponent>) { }

  ngOnInit() {
    this.getLabels();
  }

  addLabel() {
    this.label = {
      "labelName": this.labelName.value
    };
    console.log("Add label");
    this.labelService.postRequest("label/create", this.label).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackbar.open("Label created", "undo", { duration: 2500 })
        } else {
          this.snackbar.open("Label creation failed", "undo", { duration: 2500 })
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

  deletelabel(label){
    console.log("Delete label");
    this.labelService.deleteRequest("label/delete?labelId="+label.labelId).subscribe(
      (response: any)=>{
        if(response.statusCode === 1){
          this.snackbar.open("Label deleted","",{duration:2500})
        }else{
          this.snackbar.open("Label not deleted","",{duration:2500});
        }
      }
    );
  }

  labeledit(label){
    this.flag=true;
    
  }

  // editLabel() {
  //   console.log("Edit label");
  //   this.labelService.putRequest
  // }

}
