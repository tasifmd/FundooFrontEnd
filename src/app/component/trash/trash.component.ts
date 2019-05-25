import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {
  notes: any[];
  note: any;
  message :any;
  constructor(private noteService: NoteService, private snackBar: MatSnackBar , private dataService : DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response:any)=> {
        this.message=response;
       this.getTrash();
      }
    );
  }

  getTrash(){
    console.log("Trash Notes");
    this.noteService.getRequest("note/gettrashnotes").subscribe(
      (response: any) => {
        this.notes = response;
        console.log(response);
      }
    );
  }

  deleteForEver(note) {
    console.log("Delete forever" + note.id);
    this.noteService.deleteRequest("note/delete?noteId=" + note.id).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note deleted", "undo", { duration: 2500 });
        } else {
          this.snackBar.open("Note deletion failed", "undo", { duration: 2500 });
        }
      }
    );
  }

  restore(note){
    console.log("Restore note" + note.id);
    this.noteService.putRequest("note/trash?noteId=" + note.id,null).subscribe(
      (response:any)=>{
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note restored", "undo", { duration: 2500 });
        } else {
          this.snackBar.open("Note restore failed", "undo", { duration: 2500 });
        }
      }
    );
  }

}
