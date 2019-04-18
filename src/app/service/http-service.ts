import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
    providedIn: 'root'
})
export class HttpService {
    baseurl = environment.baseUrl
  
    constructor(private http: HttpClient) { }
    
    public postRequest(baseurl :any, data: any ):any{
      return this.http.post(baseurl,data);
    }
    public putRequest(baseurl :any, data: any ):any{
      return this.http.put(baseurl,data);
    }
    public deleteRequest(baseurl :any):any{
      return this.http.delete(baseurl);
    }
    public getRequest(baseurl :any):any{
  return this.http.get(baseurl);
    }
}
