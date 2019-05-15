
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private obtainNotes = new BehaviorSubject([]);
  currentNotes = this.obtainNotes.asObservable();

  constructor(private noteService: NoteService) {
    this.getUnpinnedNotes();
    this.getPinnedNotes();
  }

  getUnpinnedNotes() {
    this.noteService.getRequest("note/getunpinnednotes").subscribe(
      (response: any) => {
        this.obtainNotes.next(response);
      }
    );
  }

  getPinnedNotes(){
    this.noteService.getRequest("note/getpinnednotes").subscribe(
      (response: any) => {
        this.obtainNotes.next(response);
      }
    );
  }

}
