
import {throwError as observableThrowError,  Observable, Subject,} from 'rxjs';
import { Injectable} from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
// import { catchError, retry } from 'rxjs/operators';
import { map } from "rxjs/operators";
import "rxjs/Rx";

@Injectable({
    providedIn: 'root'
})
export class CoreApi {

    private subject = new Subject<any>();
    public req = <any>'';

    // let url = `http://localhost:3000${key}`;
    public url = `http://localhost:8000`;

  constructor(private http: HttpClient) { }

  async CoreApiEvent(key: string, value: object){
  let url = this.url + key; 
  return await this.http.post(url,value)
      .pipe(map(res => res))
      .toPromise()
      .then(
        data => [
            this.req = data,
            console.log(data)
        ],
        err => [
          console.log(err)
        ]
      ).then(()=>{
        return this.req;
      });
  }

  async uploadImages(key: string, fileToUpload: string, value_id: string){
    let url = this.url + key;
    const formData: FormData = new FormData();
    formData.append('photo', fileToUpload);
    formData.append('value_id', value_id);
    return this.http
      .post(url, formData)
      .pipe(map(() => { return true; }))
      .toPromise()
      .then(data => [
        this.req = data,
       ])
       .then(()=>{
        return this.req
        });
  }
}
