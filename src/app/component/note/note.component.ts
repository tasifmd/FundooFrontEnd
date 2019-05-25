import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/service/note.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { DataService } from 'src/app/service/data.service';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  notes: any[];
  unpinned: any[];
  data: any[];
  labelsOfNotes: any[];
  collabNotes : any[];
  message: any;
  constructor(private noteService: NoteService, public dialog: MatDialog, private snackBar: MatSnackBar, private dataService: DataService) {
   
  }

  ngOnInit() {
    this.dataService.currentMessage.subscribe(
      (response:any)=> {
        this.message=response;
        this.getUnPinned();
        this.getCollaboratedNotes();
      }
    );

  }

  openDialog(items): void {
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '600px', height: '230px',
      data: {
        title: items.title,
        description: items.description,
        noteId: items.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  pin(items) {
    this.noteService.putRequest("note/pin?noteId=" + items.id, null).subscribe(
      (response: any) => {
        if (response.statusCode === 1) {
          this.dataService.changeMessage(response.statusMessage);
          this.snackBar.open("Note pinned successfully")
        }
      }
    );
  }

  getUnPinned() {
    this.noteService.getRequest('note/getunpinnednotes').subscribe(
      (response: any) => {
        this.unpinned = response;
        console.log(response);
      }
    )
  }

  // getLabelOfNote(items) {
  //   this.noteService.getRequest("label/getlebelofnote?noteId=" + items.id).subscribe(
  //     (response : any ) =>{
  //       this.labelsOfNotes = response;
  //     }
  //   );
  // }

  getCollaboratedNotes(){
    this.noteService.getRequest("note/getallcollaboratednotes").subscribe(
      (response : any) => {
        this.collabNotes = response;
        console.log(this.collabNotes);
      }
    );
  }

  removeMySelf(collabitems){
    this.noteService.putRequest("note/removecollaborator?email=" + localStorage.getItem('email') + "&noteId=" + collabitems.id,null).subscribe(
      (response : any) => {
        if(response.statusCode === 1){
          this.snackBar.open("Note removed from collab","close",{duration:2500});
        }else{
          this.snackBar.open("Note not removed from collab","close",{duration:2500});
        }
      }
    );
  }
}
