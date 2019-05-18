import { HttpService } from 'src/app/service/http-service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { NoteService } from 'src/app/service/note.service';

@Component({
  selector: 'app-collaborator-dialog-box',
  templateUrl: './collaborator-dialog-box.component.html',
  styleUrls: ['./collaborator-dialog-box.component.scss']
})
export class CollaboratorDialogBoxComponent implements OnInit {
  @Input() noteData: any;
  email: string;
  user: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any , private noteService : NoteService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
  }

  
}
