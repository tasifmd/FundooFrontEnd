import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() noteData: any;
  constructor(private noteService: NoteService , private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  trash() {
    console.log("Trash note");
    this.noteService.putRequest("note/trash?noteId=" + this.noteData.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.snackBar.open("Note Trashed" , "Undo" , {duration:2500});
        }
      }
    );
  }

}
