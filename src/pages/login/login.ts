import {HttpParams} from '@angular/common/http/src/params';
import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  private username: string;
  private password: string;
  private error: string;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  constructor(public http: HttpClient) {
  }
  //https://www.djamware.com/post/59924f9080aca768e4d2b12e/ionic-3-consuming-rest-api-using-new-angular-43-httpclient


  ionViewDidLoad(): void {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  login(): void {
    const obj = {
      UserName: "snehal",
      Password: "123456"
    }
        console.log('doing'+ JSON.stringify(obj));
         const uri = 'https://yagnaai.000webhostapp.com/product/create.php';
         this.http.post(uri, JSON.stringify(obj))
        .subscribe(res => {
          console.log("done");
        }, (err) => {
          console.log(err);
        });
  }
}