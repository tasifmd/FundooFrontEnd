import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders().set('Content-Type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
};

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  baseurl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public createNote(url :any, data: any ):any{
    return this.http.post(this.baseurl+url,data,{
      headers: new HttpHeaders().set('token',localStorage.getItem('token'))
    });
  }

  public getNotes(url : any) : any {
    return this.http.post(this.baseurl+url,{
      headers: new HttpHeaders().set('token',localStorage.getItem('token'))
    });
  }
}
