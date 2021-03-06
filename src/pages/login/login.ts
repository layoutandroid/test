import { User } from './../../model/user.model';
import { Observable } from 'rxjs/Observable';
import { RegisterPage } from '../Register/register';
import { Component, ViewChild } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { AngularFireDatabase } from 'angularfire2/database';
import { FirebaseProvider } from '../../providers/firebase/firebase';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ForgotPage } from '../forgot/forgot';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../app/app.module';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('email') email: any;
  public username: string;
  public password: string;
  public error: string;
  apiUrl = 'http://72.249.170.12/BluetoothApi/api/Login/Login';
  passwordType: string = 'password';
  paIcon: string = 'eye-off';
  user: Observable<User[]>;
  loginError: string;
  uber: Observable<any>;



  constructor(private firebaseProvider: FirebaseProvider, private navCtrl: NavController,
     public http: Http, public afDatabase: AngularFireDatabase
     ) {
    //this.user = this.firebaseProvider.getShoppingItems();


  }
  //https://www.djamware.com/post/59924f9080aca768e4d2b12e/ionic-3-consuming-rest-api-using-new-angular-43-httpclient


  ionViewDidLoad(): void {
    setTimeout(() => {
      this.email.setFocus();
    }, 500);
  }

  // login(): void {
  //   const obj = {
  //     "UserName":"admin",
  //     "Password":"admin"
  //    }
  // var headers = new Headers();
  //     headers.set('Content-type','application/json');
  //       console.log('doing'+ JSON.stringify(obj));
  //       debugger;
  //        const uri = 'http://72.249.170.12/HRDCServiceOnline/user.svc/UserLogin';
  //        this.http.post(uri,JSON.stringify(obj),{headers})
  //       .subscribe(res => {
  //         console.log("done");
  //         alert('done');
  //       }, (err) => {
  //         console.log(err);
  //       });

  // }

  login() {
    debugger;

		if (!this.username) {
			return;
		}

		let credentials = {
			email: this.username,
			password: this.password
		};
		this.firebaseProvider.signInWithEmail(credentials)
			.then(
        (user) => {
          if(user.user.emailVerified){
            this.firebaseProvider.Superuser = user.user;
            var pre_user= user.user;
            if (pre_user) {
              this.firebaseProvider.findEmail(pre_user.email).then (
                (ref)=>{
                this.uber=ref;
                ////
                this.uber.subscribe ((res: User[]) => {
                      console.log(res);
                  var m_user = res
                  if(m_user.length===0)
                  {
                    this.firebaseProvider.isRegistredUser =false;
                    this.navCtrl.setRoot(RegisterPage,{"email":pre_user.email});
                  }
                  else
                  {

                    this.firebaseProvider.username = res[0].Username;
                    this.navCtrl.setRoot(HomePage);
                  }
                  },
                  ()=>{
                    this.firebaseProvider.isRegistredUser = false;
                    return false;
                  }
                );

              }
              );
           }

            ////////////////
          }
          else{
            alert("Email not varifired.Please check your mailbox");
            this.firebaseProvider.sendEmailVerificationLink(user.user).then(
              (ref)=>{
              },
              (error)=>{
                 alert(error.message);
              }
            );
          }
        },
        error =>{ alert(error.message); this.loginError = error.message}

			);
  }

  signup(){
    this.navCtrl.push(RegisterPage,{"email":"null"});
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.paIcon = this.paIcon === 'eye-off' ? 'eye' : 'eye-off';
}

forgotPassword(){
  this.navCtrl.push(ForgotPage);
}

loginWithGoogle() {
  debugger;
  this.firebaseProvider.signInWithGoogle()
     .then(
     (user) =>{
        if(user.user.emailVerified){
          this.firebaseProvider.Superuser = user.user;
          var pre_user= user.user;
          if (pre_user) {
            this.firebaseProvider.findEmail(pre_user.email).then (
              (ref)=>{
              this.uber=ref;
              ////
              this.uber.subscribe ((res: User[]) => {
                    console.log(res);
                var m_user = res
                if(m_user.length===0)
                {
                  this.firebaseProvider.isRegistredUser =false;
                  this.navCtrl.setRoot(RegisterPage,{"email":pre_user.email});
                }
                else
                {

                  this.firebaseProvider.username = res[0].Username;
                  this.navCtrl.setRoot(HomePage);
                }
                },
                ()=>{
                  this.firebaseProvider.isRegistredUser = false;
                  return false;
                }
              );

            }
            );
         }
        }
        else{
          alert("Email not varifired.Please check your mailbox");
        }
         },
     (error) => console.log(error.message)
     );
}



saveData() {
  const obj = {
              UserName: "N/A",
              Password:"N/A",
              Name:"N/A",
              Email:this.firebaseProvider.getEmail()
            }
             this.firebaseProvider.addUser(obj);

}
}
