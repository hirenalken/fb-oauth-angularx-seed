import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AlertModule } from 'ngx-bootstrap';

import { HomeComponent }  from './home.component';


import { FacebookSdkService } from '../_services/facebook-sdk.service';

@NgModule({
  imports:      [ AlertModule.forRoot(), BrowserModule ],
  declarations: [ HomeComponent ],
  bootstrap:    [ HomeComponent ],
  providers: [FacebookSdkService],
})
export class HomeModule { }
