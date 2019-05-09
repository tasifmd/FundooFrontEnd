import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatDialog } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any[];
  data: any[];
  constructor(private noteService: NoteService, public dialog: MatDialog) {
  }

  ngOnInit() {
    console.log("Get notes");
    this.noteService.getRequest('note/getallnotes').subscribe(
      (response: any) => {
        this.notes = response;
        console.log(response);
      }
    )
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
}
