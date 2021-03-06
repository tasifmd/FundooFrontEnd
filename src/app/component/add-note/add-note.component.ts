import { NoteService } from './../../service/note.service';
import { NoteModel } from './../../model/note-model';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})

export class AddNoteComponent implements OnInit {
  private showAddNote: boolean;
  note : NoteModel = new NoteModel();

  constructor(private noteService : NoteService , private snackBar: MatSnackBar ,private dataService : DataService) { }

  ngOnInit() {

  }

  showBar(){
    this.showAddNote=true;
  }
  
  close(){
    console.log("Add Note");
    console.log(localStorage.getItem("token"));
    this.noteService.postRequest("note/create" , this.note).subscribe(
      (response : any) => {
        if(response.statusCode === 1){
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open(
            response.statusMessage,"close",{duration:2500}
          );
        }
        else{
          this.snackBar.open(
            response.statusMessage,"close",{duration:2500}
          );
        }
      }
    );
    this.showAddNote = false;
  }
}
