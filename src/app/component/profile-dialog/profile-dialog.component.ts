import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss']
})
export class ProfileDialogComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>) { }

  ngOnInit() {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(event: any) {
    console.log(event);
    this.croppedImage = event;
  }

  setProfile() {
    if (this.croppedImage != null) {
      this.dialogRef.close(this.croppedImage);
    }
  }

  close(){
    this.dialogRef.close();
  }
}
