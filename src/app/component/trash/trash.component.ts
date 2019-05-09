import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes : any[];
  constructor(private noteService: NoteService , private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("Trash Notes");
    this.noteService.getRequest("note/gettrashnotes").subscribe(
      (response:any)=>{
        this.notes=response;
        console.log(response);
      }
    );
  }
  deleteForEver(){
    console.log("Delete forever");
    this.noteService.deleteRequest("note/delete")
  }

}
