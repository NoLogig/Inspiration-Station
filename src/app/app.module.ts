import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { environment } from '../environments/environment';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from "@angular/forms";

import { ServiceWorkerModule } from '@angular/service-worker';

import { HomeModule } from './home/home.module';
import { LayoutsModule } from './pages/layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { AppComponent } from './app.component';

import { ActiveDirective } from './utils/directives/active.directive';

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    ActiveDirective, 
    AppComponent,
  ],
  imports: [
    AppRoutingModule, BrowserModule, BrowserAnimationsModule, FormsModule, HttpClientModule,

    HomeModule, LayoutsModule, PagesModule,

    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [ ]
})
export class AppModule { }
