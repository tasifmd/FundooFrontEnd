import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {
  notes: any[];
  note: any;
  constructor(private noteService: NoteService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    console.log("Archieve Notes");
    this.noteService.getRequest("note/getarchivenotes").subscribe(
      (response: any) => {
        this.notes = response;
        console.log(this.notes);
      }
    );
  }
  unarchive(note){
    console.log("Unarchive Note");
    this.noteService.putRequest("note/archive?noteId=" + note.id,null).subscribe(
      (response:any)=>{
        if(response.statusCode === 1){
          this.snackBar.open("Note unarchived","undo",{duration:2500});
        }
      }
    );
  }
}
