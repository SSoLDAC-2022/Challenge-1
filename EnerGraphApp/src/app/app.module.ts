import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapviewComponent } from './mapview/mapview.component';
import { MapvizComponent } from './mapviz/mapviz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfoboxComponent } from './infobox/infobox.component';
import { HttpClientModule } from  '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    MapviewComponent,
    MapvizComponent,
    InfoboxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatCheckboxModule,  
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
