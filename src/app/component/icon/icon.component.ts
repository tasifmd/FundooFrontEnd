import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() noteData : any;
  constructor() { }

  ngOnInit() {
  }

  getNoteId(){
    console.log("Note id "  + this.noteData.id);
    localStorage.setItem("noteId",this.noteData.id);
  }
  
}
