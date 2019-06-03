import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';
import { concat } from 'rxjs';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.scss']
})
export class DialogboxComponent implements OnInit {
  @Input() noteData: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private noteService: NoteService, private snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogboxComponent>, private dataService: DataService) { }

  note: any;
  title = new FormControl(this.data.title);
  description = new FormControl(this.data.description);
  id = this.data.noteId;
  color = this.data.color;
  ngOnInit() {
  }

  updateNote(items) {
    this.note = {
      "title": this.title.value,
      "description": this.description.value,
      "colorCode": this.data.color
    }
    console.log("Note color : " + this.data.color);
    this.noteService.putRequest("note/update?noteId=" + this.id, this.note).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(response.statusMessage, "Close", { duration: 2500 });
        } else {
          this.snackBar.open(response.statusMessage, "Close", { duration: 2500 });
        }
      }
    );
    this.dialogRef.close();
  }
}
