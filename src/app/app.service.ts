import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_URLS } from './config/api.url.config';

@Injectable()
export class AppService {

  authenticated: boolean = false;

  constructor(private http: HttpClient) { }

  authenticate(credentials, callback) {
    if(credentials){
      const token = btoa(credentials.username + ':' + credentials.password);

      const headers = new HttpHeaders(credentials ? {
          authorization : 'Basic ' + token
      } : {});

      this.http.get(API_URLS.USER_URL, {headers: headers}).subscribe(response => {
          if (response && response['name']) {
              this.authenticated = true;
          } else {
              this.authenticated = false;
          }
          return callback && callback();
      });
    }
    else {
      this.authenticated = false;
    }
  }

  logout(callback){
    this.http.post('logout', {}).finally(()=>{
      this.authenticated = false;
      return callback && callback();
    }).subscribe();

  }
}
