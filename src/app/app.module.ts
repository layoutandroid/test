import { HttpClient } from '@angular/common/http';
import { TabPage } from './../pages/tabpage/tabpage';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ContactPage } from './../pages/contact/contact';
import { AboutPage } from './../pages/about/about';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/Register/register';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModelPage } from '../pages/Model/model';
import { HomePagetest } from '../pages/hometest/hometest';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,HomePagetest
  ],
  imports: [
    BrowserModule,
    HttpModule,HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,HomePagetest,
  ],
  providers: [
    StatusBar,
    SplashScreen,TabsPage,AboutPage,ContactPage,TabPage,LoginPage,RegisterPage,ModelPage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
})
export class AppModule {}

