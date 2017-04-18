import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router';

import { FacebookSdkService } from '../_services/facebook-sdk.service';


//import models
import { FbUser, FacebookAuthResponse } from '../_models/index';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  fbAuthRestponse: FacebookAuthResponse;
  fbLoginStatus = "";
  fbUser: FbUser;
  fbRespString : any;

  constructor(private facebookSdkService: FacebookSdkService) { }

  loginWithFb() {  
    this.facebookSdkService.facebookLogin().subscribe(
      fb_auth_resp => {
        this.fbAuthRestponse = fb_auth_resp;
        console.log(this.fbAuthRestponse);
        this.fbRespString = JSON.stringify(this.fbAuthRestponse);
        this.fbLoginStatus = this.facebookSdkService.fbLoginStatus;

        if (this.fbLoginStatus == "connected") {
          // get user's basic info from facebook
          this.facebookSdkService.me().subscribe(
            fbUser => {
              this.fbUser = fbUser;
              console.log(this.fbUser);
            });
        }
      }
    );
  }

  logout() {
     this.facebookSdkService.facebookLogout().subscribe(
      fb_auth_resp => {
        this.fbAuthRestponse = fb_auth_resp;
        console.log(this.fbAuthRestponse);
        this.fbLoginStatus = this.facebookSdkService.fbLoginStatus;        
      }
    );   
  }



  ngOnInit() {
    // FB.getLoginStatus((response:any) => {
    //     this.statusChangeCallback(response);
    // });   
    this.facebookSdkService.logitStatus().subscribe(
      fb_auth_resp => {
        this.fbAuthRestponse = fb_auth_resp;
        console.log(this.fbAuthRestponse);
        this.fbRespString = JSON.stringify(this.fbAuthRestponse);
        this.fbLoginStatus = this.facebookSdkService.fbLoginStatus;        
      }
    );   
    this.fbLoginStatus = this.facebookSdkService.fbLoginStatus;
  }
}
