import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-remainder',
  templateUrl: './remainder.component.html',
  styleUrls: ['./remainder.component.scss']
})
export class RemainderComponent implements OnInit {
  notes : any[];
  message: any;
  constructor(private noteService: NoteService , private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response: any) => {
       this.getnotes();
      }
    );
  }

  getnotes() {
    this.noteService.getRequest("note/getallnotes").subscribe(
      (response : any) =>{
        this.notes = response;
      }
    );
  }
}
