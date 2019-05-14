import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material';
import { LabelService } from 'src/app/service/label.service';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() noteData: any;
  allLabels: any[];
  labelsOfNotes: any[];
  constructor(private noteService: NoteService, private snackBar: MatSnackBar, private labelService: LabelService) { }

  ngOnInit() {
    this.getLabels();
    this.getLabelOfNote();
  }

  trash() {
    console.log("Trash note");
    this.noteService.putRequest("note/trash?noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Note Trashed", "Undo", { duration: 2500 });
        }
      }
    );
  }

  archive() {
    console.log("Archive note");
    this.noteService.putRequest("note/archive?noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Note archieved", "undo", { duration: 2500 });
        } else {
          this.snackBar.open("Note archieve failed", "undo", { duration: 2500 });
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
          this.snackBar.open("Label added to note", "", { duration: 2500 });
        } else {
          this.snackBar.open("Label is not added to note", "", { duration: 2500 });
        }
      }
    );
  }

  getLabelOfNote() {
    this.noteService.getRequest("label/getlebelofnote?noteId=" + this.noteData.id).subscribe(
      (response: any) => {
        this.labelsOfNotes = response;
        console.log(this.noteData.id);
        console.log(this.labelsOfNotes);
      }
    );
  }

  removeLabelFromNote(label) {
    this.noteService.putRequest("label/removefromnote?noteId=" + this.noteData.id + "&labelId=" + label.labelId, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Label removed from note", "", { duration: 2500 });
        } else {
          this.snackBar.open("Label is not removed from note", "", { duration: 2500 });
        }
      }
    );
  }
}
