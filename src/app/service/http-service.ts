import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    baseurl = environment.baseUrl;
  
    constructor(private http: HttpClient) { }
    
    public postRequest(url :any, data: any ):any{
      return this.http.post(this.baseurl + url,data);
    }
    public putRequest(url :any, data: any ):any{
      return this.http.put(this.baseurl + url,data);
    }
    public deleteRequest(url :any):any{
      return this.http.delete(this.baseurl + url);
    }
    public getRequest(url :any):any{
  return this.http.get(this.baseurl + url);
    }
}
