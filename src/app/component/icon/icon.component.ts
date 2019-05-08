import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() note : any;
  constructor() { }

  ngOnInit() {
  }

  getNoteId(){
    console.log("Note id "  + this.note.id);
    localStorage.setItem("noteId",this.note.id);
  }
  
}
