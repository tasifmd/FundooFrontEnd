
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  constructor() { }
  
  changeMessage(message: string) {
    this.messageSource.next(message)
  }
}
