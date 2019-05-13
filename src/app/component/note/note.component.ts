import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any[];
  unpinned : any[];
  data: any[];
  constructor(private noteService: NoteService, public dialog: MatDialog,private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log("Get notes");
    this.noteService.getRequest('note/getallnotes').subscribe(
      (response: any) => {
        this.notes = response;
        console.log(response);
      }
    );
    this.getUnPinned();
  }

  openDialog(items): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '600px', height: '230px',
      data: {
        title: items.title,
        description: items.description,
        noteId: items.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    
  }

  pin(items) {
    this.noteService.putRequest("note/pin?noteId=" + items.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Note pinned successfully")
        }
      }
    );
  }

  getUnPinned(){
    this.noteService.getRequest('note/getunpinnednotes').subscribe(
      (response: any) => {
        this.unpinned = response;
        console.log(response);
      }
    ) 
  }
}
