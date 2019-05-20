import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/service/http-service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.scss']
})
export class CollaboratorDialogBoxComponent implements OnInit {
  @Input() noteData: any;
  email: string;
  userName: string;
  collabUser: any[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<CollaboratorDialogBoxComponent>) { }
  shareEmail = new FormControl('', Validators.email);
  
  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.email = localStorage.getItem('email');
    this.getCollabUser();

  }

  getCollabUser() {
    console.log("Collab Tasif");
    this.noteService.getRequest("note/getallcollaborateduser?noteId=" + this.data.noteId).subscribe(
      (response: any) => {
        this.collabUser = response;
        console.log(this.collabUser);
      }
    );
  }

  addCollab() {
    const data = {
      "shareEmail": this.shareEmail.value
    }
    console.log(data.shareEmail);
    this.noteService.putRequest("note/addcollaborator?email=" + data.shareEmail + "&noteId=" + this.data.noteId, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Note collabotared", "Close", { duration: 2500 });
        }
        else {
          this.snackBar.open("Note collaboration failed", "Close", { duration: 2500 });
        }
      }
    );
  }

  removeCollab(item) {
    console.log(item.email);
    this.noteService.putRequest("note/removecollaborator?email=" + item.email + "&noteId=" + this.data.noteId ,null).subscribe(
      (response : any) => {
        if(response.statusCode === 1){
          this.snackBar.open("Collabotared note removed", "Close", { duration: 2500 });
        }else{
          this.snackBar.open("Collabotared note not removed", "Close", { duration: 2500 });
        }
      }
    );
  }

  cancel(){
    this.dialogRef.close();
  }

  save(){
    this.addCollab();
    this.dialogRef.close();
  }

}