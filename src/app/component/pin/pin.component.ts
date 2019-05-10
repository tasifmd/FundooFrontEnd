import { MatSnackBar } from '@angular/material';
import { NoteService } from './../../service/note.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  notes: any[];
  note: any;
  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("Pinned Notes")
    this.noteService.getRequest("note/getpinnednotes").subscribe(
      (response: any) => {
        this.notes = response;
        console.log(this.notes);
      }
    );
  }
  unpin(note) {
    console.log("Un pin note ");
    this.noteService.putRequest("note/pin?noteId="+ note.id,null).subscribe(
      (response: any)=>{
        if(response.statusCode === 1){
          this.snackBar.open("Note unpinned" ,"undo" ,{duration:2500});
        }
      }
    );
  }

}
