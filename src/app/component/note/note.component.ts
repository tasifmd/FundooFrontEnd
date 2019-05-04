import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { NoteModel } from 'src/app/model/note-model';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: NoteModel[];
  constructor(private noteService: NoteService) { 
    
  }

  ngOnInit() {
    console.log("Get notes");
    this.noteService.getNotes('getallnotes').subscribe(
      (response: any) => {
        this.notes=response;
        console.log(response);
      }
    )
  }

}
