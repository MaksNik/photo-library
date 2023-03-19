import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './components/shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './components/navigation/navigation.component';
import {MatTabsModule} from "@angular/material/tabs";
import { RandomPhotosComponent } from './components/random-photos/random-photos.component';
import { HttpClientModule} from "@angular/common/http";
import { FavoritePhotosComponent } from './components/favorite-photos/favorite-photos.component';
import { SingleFavoritePhotoComponent } from './components/single-favorite-photo/single-favorite-photo.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    RandomPhotosComponent,
    FavoritePhotosComponent,
    SingleFavoritePhotoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    HttpClientModule,
    SharedModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
