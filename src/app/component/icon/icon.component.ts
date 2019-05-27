import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';
import { CollaboratorDialogBoxComponent } from '../collaborator-dialog-box/collaborator-dialog-box.component';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() noteData: any;
  allLabels: any[];
  labelsOfNotes: any[];
  collabUsers: any[];
  remData: any;
  notereminder: any;
  colors = [
    [
      { colorName: "white", colorCode: "#FFFFFF" },
      { colorName: "red", colorCode: "#FF0000" },
      { colorName: "orange", colorCode: "#FFA500" },
      { colorName: "yellow", colorCode: "#FFFF00" },
    ],
    [
      { colorName: "green", colorCode: "#008000" },
      { colorName: "teal", colorCode: "#008080" },
      { colorName: "blue", colorCode: "#0000FF" },
      { colorName: "dark blue", colorCode: "#0000A0" },
    ],
    [
      { colorName: "purple", colorCode: "#800080" },
      { colorName: "pink", colorCode: "#FFC0CB" },
      { colorName: "brown", colorCode: "#A52A2A" },
      { colorName: "gray", colorCode: "#A9A9A9" },
    ]
  ]
  message: any;
  constructor(private noteService: NoteService, private snackBar: MatSnackBar, private labelService: LabelService, public dialog: MatDialog, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
        this.message = response;
        this.getLabels();
        this.getLabelOfNote();
        this.getCollabOfNote();
        this.getRemainder();
      }
    );


  }

  trash() {
    console.log("Trash note");
    this.noteService.putRequest("note/trash?noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note Trashed", "close", { duration: 2500 });
        }
      }
    );
  }

  archive() {
    console.log("Archive note");
    this.noteService.putRequest("note/archive?noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note archieved", "close", { duration: 2500 });
        } else {
          this.snackBar.open("Note archieve failed", "close", { duration: 2500 });
        }
      }
    );
  }

  getLabels() {
    console.log("Get Label");
    this.labelService.getRequest("label/getlabel").subscribe(
      (response: any) => {
        this.allLabels = response;
        // console.log(this.allLabels);
      }
    );
  }

  onEvent(event) {
    event.stopPropagation();
  }

  addLabelToNote(label) {
    console.log("Add label to  note");
    this.labelService.putRequest("label/addlebeltonote?labelId=" + label.labelId + "&noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Label added to note", "close", { duration: 2500 });
        } else {
          this.snackBar.open("Label is not added to note", "close", { duration: 2500 });
        }
      }
    );
  }

  getLabelOfNote() {
    this.noteService.getRequest("label/getlebelofnote?noteId=" + this.noteData.id).subscribe(
      (response: any) => {
        this.labelsOfNotes = response;
      }
    );
  }

  removeLabelFromNote(label) {
    this.noteService.putRequest("label/removefromnote?noteId=" + this.noteData.id + "&labelId=" + label.labelId, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Label removed from note", "close", { duration: 2500 });
        } else {
          this.snackBar.open("Label is not removed from note", "close", { duration: 2500 });
        }
      }
    );
  }

  setColor(color) {
    console.log(color);
    console.log(this.noteData.id);
    this.noteService.putRequest("note/color?colorCode=" + color + "&noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note color changed", "close", { duration: 2500 });
        }
      }
    );
  }

  openCollabDialog() {
    const dialogRef = this.dialog.open(CollaboratorDialogBoxComponent, {
      width: '700px', minHeight: '100px',
      data: {
        noteId: this.noteData.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  getCollabOfNote() {
    this.noteService.getRequest("note/getallcollaborateduser?noteId=" + this.noteData.id).subscribe(
      (response: any) => {
        this.collabUsers = response;
      }
    );
  }

  reminder() {
    console.log("Inside reminder");
    this.remData = {
      id: this.noteData.id,
      time: this.remData
    }
    //console.log(this.remData.id)
  }

  today() {
    let curDate = new Date();
    this.remData = {
      reminder: curDate.toISOString()
    }
    console.log(this.remData.reminder);
    this.noteService.putRequest("note/addreminder?noteId=" + this.noteData.id + "&reminder=" + this.remData.reminder, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
        }
      }
    );
  }

  tomorrow() {
    let curDate = new Date();
    var nextDay = new Date(curDate);
    nextDay.setDate(curDate.getDate() + 1);
    this.remData = {
      reminder: nextDay.toISOString()
    }
    console.log(this.remData.reminder);
    this.noteService.putRequest("note/addreminder?noteId=" + this.noteData.id + "&reminder=" + this.remData.reminder, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
        }
      }
    );
  }

  nextweek() {
    var day = new Date();

    var days = 7 - day.getDay() + 4;

    var nextDay = new Date(day.setDate(day.getDate() + days));
    this.remData = {
      reminder: nextDay.toISOString()
    }
    console.log(this.remData.reminder);
    this.noteService.putRequest("note/addreminder?noteId=" + this.noteData.id + "&reminder=" + this.remData.reminder, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
        }
      }
    );
  }

  getRemainder() {
    this.notereminder = this.noteData.reminder;
    console.log("Remainder "+this.notereminder);
  }

  removeremainder(){
    this.noteService.putRequest("note/removereminder?noteId=" + this.noteData.id,null).subscribe(
      (response : any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(response.statusMessage, "close", { duration: 2500 });
        }
      }
    );
  }
}
