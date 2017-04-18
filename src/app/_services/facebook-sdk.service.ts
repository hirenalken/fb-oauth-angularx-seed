import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { FacebookAuthResponse, FbUser } from '.././_models/index'; 
import { Observable } from 'rxjs/Observable';
import { Observer, NextObserver } from 'rxjs/Observer';


import 'rxjs/add/operator/map';

declare const FB: any;



@Injectable()
export class FacebookSdkService  {
    fbLoginStatus = "";
    response: FacebookAuthResponse;
    fbUser: FbUser;
    // private FB: any;
    constructor() {
        FB.init({
            appId: 'your-app-id',
            cookie: false,  // enable cookies to allow the server to access
            status: true,                    // the session
            xfbml: true,
              // parse social plugins on this page
            version: 'v2.8' // use graph api version 2.8
        });              
    }    

    facebookLogin() : Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {
        
            FB.login((response: FacebookAuthResponse) => {
                // add logic to store user in localstorage
                this.response = response;  
                this.fbLoginStatus = response.status; 
                observer.next(this.response);
                observer.complete();                   
            });
        });
    }  

    facebookLogout() : Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {
        
            FB.logout((response: FacebookAuthResponse) => {
                // add logic to store user in localstorage
                this.response = response;  
                this.fbLoginStatus = response.status; 
                observer.next(this.response);
                observer.complete();                   
            });
        });
    }

    logitStatus() : Observable<FacebookAuthResponse> {
        return Observable.create((observer: NextObserver<FacebookAuthResponse>) => {
        
            FB.getLoginStatus((response: FacebookAuthResponse) => {
                // add logic to store user in localstorage
                this.response = response;  
                this.fbLoginStatus = response.status; 
                observer.next(this.response);
                observer.complete();                   
            });
        });
    }   

    me() : Observable<FbUser> {
        return Observable.create((observer: NextObserver<FbUser>) => {

            FB.api('/me?fields=id,first_name,last_name,email', (response:any) => {
                this.fbUser = response;                
                observer.next(this.fbUser);
                observer.complete(); 
            });      
           
        });
    }


    statusChangeCallback(resp: FacebookAuthResponse) {
        if (resp.status === 'connected') {
            // connect here with your server for facebook login by passing access token given by facebook
            console.log(resp);
            status = resp.status;
            var uid = resp.authResponse.userID;
            var accessToken = resp.authResponse.accessToken;
        } else if (resp.status === 'not_authorized') {

        } else {

        }

        this.fbLoginStatus = resp.status;
        console.log(status);
    };
}


